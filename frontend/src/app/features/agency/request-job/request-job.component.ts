import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '@shared/services/job.service';

@Component({
  selector: 'app-request-job',
  templateUrl: './request-job.component.html',
  styleUrls: ['./request-job.component.css']
})
export class RequestJobComponent implements OnInit {
  protected current_step: number = 0;

  protected choosen_object: string = null;

  protected agency_id: string;

  protected start_date: Date = new Date();
  protected end_date: Date = new Date();

  protected errors: string[] = [];
  protected messages: string[] = [];

  constructor(private jobService: JobService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.agency_id = this.activeRoute.snapshot.queryParams['id'];
  }

  choosen(choosen_object: string) {
    this.choosen_object = choosen_object;
    this.current_step++;
  }

  request() {
    this.messages = [];
    this.errors = [];
    
    this.jobService.request(this.choosen_object, this.agency_id, this.start_date, this.end_date).then(
      () => {
        this.messages.push('Uspešno poslat zahtev.');
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

}
