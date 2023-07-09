import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { JOB_STATUSES, JOB_STATUSES_GROUPED, USER_TYPES } from '@shared/consts';
import { AccountService } from '@shared/services/account.service';
import { JobService } from '@shared/services/job.service';


@Component({
  selector: 'app-job-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  public job;

  user_type: string;

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  public get JOB_STATUSES() {
    return JOB_STATUSES;
  }

  public get job_active() {
    return JOB_STATUSES_GROUPED.undergoing.includes(this.job['status']); 
  }

  constructor(private accountService: AccountService, private jobService: JobService) { }

  ngOnInit(): void {
    this.user_type = this.accountService.user_type;
  }

  protected format_date(date: string) {
    const date_object = new Date(date);

    const day = date_object.getDate();
    const month = date_object.getMonth() + 1;
    const year = date_object.getFullYear();

    const day_format = (day < 10 ? '0' : '') + day;
    const month_format = (month < 10 ? '0' : '') + month;
    const year_format = year;

    return day_format + '/' + month_format + '/' + year_format;
  }

  offer() {
    let amount: number;
    try {
      amount = parseInt(prompt("Iznos za kompenzaciju:"));
    }
    catch(error) {
      alert('Unesite ispravnu sumu.');
      return;
    }

    this.jobService.offer(this.job['_id'], amount).then(
      () => {
        alert('Uspešno ste poslali ponudu.');
        this.job['status'] = JOB_STATUSES.offered;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  decline_request() {
    this.jobService.decline_request(this.job['_id']).then(
      () => {
        alert('Uspešno ste odbili zahtev.');
        this.job['status'] = JOB_STATUSES.declined;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  accept_offer() {
    this.jobService.accept_offer(this.job['_id']).then(
      () => {
        alert('Uspešno ste prihvatili ponudu.');
        this.job['status'] = JOB_STATUSES.active;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  decline_offer() {
    this.jobService.decline_offer(this.job['_id']).then(
      () => {
        alert('Uspešno ste odbili ponudu.');
        this.job['status'] = JOB_STATUSES.declined;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
}
