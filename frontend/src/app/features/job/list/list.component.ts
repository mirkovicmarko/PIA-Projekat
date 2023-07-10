import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JOB_STATUSES, WEBSITE_URL } from '@shared/consts';
import { JobService } from '@shared/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private jobs;
  protected filtered_jobs = [];

  private filters: string[] = [];

  protected errors: string[] = [];

  private type: string;

  protected get JOB_STATUSES() {
    return JOB_STATUSES;
  }

  constructor(private jobService: JobService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.errors = [];
    this.filtered_jobs = [];

    this.jobService.get_all().then(
      (response) => {
        this.jobs = response;
        this.update();

        this.type = this.activeRoute.snapshot.queryParams['type'];
        if(this.type !== undefined) {
          this.filter_by(this.type);
        }
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  protected filter_by(type: string) {
    this.filters = [];

    this.type = type;

    switch(type) {
      case 'requested':
        this.filters.push(JOB_STATUSES.requested);
        this.filters.push(JOB_STATUSES.offered);
        break;
      case 'active':
        this.filters.push(JOB_STATUSES.awaiting);
        this.filters.push(JOB_STATUSES.undergoing);
        this.filters.push(JOB_STATUSES.finished);
        break;
      case 'done':
        this.filters.push(JOB_STATUSES.paid);
        this.filters.push(JOB_STATUSES.canceled);
        this.filters.push(JOB_STATUSES.rejected);
        this.filters.push(JOB_STATUSES.declined);
        break;
      default:
        this.type = undefined;
        break;
    }

    this.update();
  }

  private update() {
    if(this.filters.length > 0) {
      this.filtered_jobs = [];

      for(let job of this.jobs) {
        if(this.filters.includes(job['status']))
          this.filtered_jobs.push(job);
      }
    }
    else {
      this.filtered_jobs = this.jobs;
    }
  }

  protected reload_page() {
    const query = this.type !== undefined ? '?type=' + this.type : '';
    window.location.assign(window.location.origin + '/jobs/list' + query);
  }

}
