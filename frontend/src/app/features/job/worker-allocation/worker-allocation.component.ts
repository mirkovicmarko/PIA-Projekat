import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Object from '@shared/models/object';
import { Worker } from '@shared/models/user';
import { JobService } from '@shared/services/job.service';
import { ObjectService } from '@shared/services/object.service';
import { WorkerService } from '@shared/services/worker.service';

@Component({
  selector: 'app-worker-allocation',
  templateUrl: './worker-allocation.component.html',
  styleUrls: ['./worker-allocation.component.css']
})
export class WorkerAllocationComponent implements OnInit {

  private id: string;
  protected job = null;

  protected workers: Worker[] = [];

  protected content_loaded: boolean = false;
  protected messages: string[] = [];
  protected errors: string[] = [];

  constructor(private jobService: JobService, private workerService: WorkerService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.load_content();
  }

  async load_content() {
    this.id = this.activeRoute.snapshot.queryParams['id'];

    if(this.id === undefined) {
      this.errors.push('Nije zadat id posla.');
      return;
    }

    await this.jobService.get(this.id).then(
      (job) => {
        this.job = job;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );

    await this.workerService.get_all().then(
      (workers: Worker[]) => {
        this.workers = workers;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );

    if(this.errors.length === 0) {
      this.content_loaded = true;
    }
  }

}
