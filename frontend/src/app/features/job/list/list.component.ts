import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JOB_STATUSES } from '@shared/consts';
import { JobService } from '@shared/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private jobs;
  protected filtered_jobs = [];

  protected errors: string[] = [];

  protected get JOB_STATUSES() {
    return JOB_STATUSES;
  }

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.errors = [];
    this.filtered_jobs = [];

    this.jobService.get_all().then(
      (response) => {
        console.log(response)
        this.jobs = response;
        this.update();
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  private update() {
    this.filtered_jobs = this.jobs;
  }

}
