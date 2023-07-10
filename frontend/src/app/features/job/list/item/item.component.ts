import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JOB_STATUSES, JOB_STATUSES_GROUPED, USER_TYPES } from '@shared/consts';
import { AccountService } from '@shared/services/account.service';
import { AgencyService } from '@shared/services/agency.service';
import { JobService } from '@shared/services/job.service';
import { ObjectsChangeConstructionStatusComponent } from '@shared/ui/objects-change-construction-status/objects-change-construction-status.component';


@Component({
  selector: 'app-job-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Output()
  change_event = new EventEmitter<boolean>();

  @Input()
  public job;

  @ViewChild('canvasObjects', {static: false})
  private canvas_element: ObjectsChangeConstructionStatusComponent;

  user_type: string;

  protected status_change_modal_open: boolean = false;

  protected cancellation_request_modal_open: boolean = false;
  protected cancellation_request_message: string = "";

  protected rate_modal_open: boolean = false;
  protected rating = {
    title: '',
    text: '',
    rating: 5
  };

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  public get JOB_STATUSES() {
    return JOB_STATUSES;
  }

  public get job_active() {
    return JOB_STATUSES_GROUPED.undergoing.includes(this.job['status']); 
  }

  constructor(private accountService: AccountService, private jobService: JobService, private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.user_type = this.accountService.user_type;
  }

  protected background_color() {
    if(this.user_type !== USER_TYPES.client) return 'transparent';
    else if(this.job['status'] === JOB_STATUSES.rejected) return 'rgba(255, 0, 0, 0.2)';
    else if(this.job['status'] === JOB_STATUSES.offered) return 'rgba(0, 255, 0, 0.2)';
    else return 'transparent';
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

  private signal_update() {
    this.change_event.emit(true);
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
        this.signal_update();
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
        this.signal_update();
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
        this.signal_update();
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
        this.signal_update();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  update_status() {
    this.jobService.update_object_status(this.job['object']['_id'], this.canvas_element.get_updated_rooms()).then(
      () => {
        alert('Uspešno ste promenili status.');
        this.signal_update();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  pay() {
    this.jobService.pay(this.job['_id']).then(
      () => {
        alert('Uspešno ste platili.');
        this.signal_update();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  cancellation_request() {
    this.jobService.cancellation_request(this.job['_id'], this.cancellation_request_message).then(
      () => {
        alert('Uspešno ste poslali zahtev za otkazivanjem.');
        this.signal_update();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  rate() {
    this.agencyService.rate(this.job['agency_info']['_id'], this.rating.title, this.rating.text, this.rating.rating).then(
      () => {
        alert('Uspešno ste ocenili agenciju.');
        this.signal_update();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
}
