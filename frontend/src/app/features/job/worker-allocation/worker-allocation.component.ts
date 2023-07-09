import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Object from '@shared/models/object';
import { Worker } from '@shared/models/user';
import { JobService } from '@shared/services/job.service';
import { ObjectService } from '@shared/services/object.service';
import { WorkerService } from '@shared/services/worker.service';
import { ObjectsWorkerAllocationComponent } from '@shared/ui/objects-worker-allocation/objects-worker-allocation.component';

@Component({
  selector: 'app-worker-allocation',
  templateUrl: './worker-allocation.component.html',
  styleUrls: ['./worker-allocation.component.css']
})
export class WorkerAllocationComponent implements OnInit {

  @ViewChild('canvasObjects', {static: false})
  private canvas_element: ObjectsWorkerAllocationComponent;

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

    await this.workerService.get_all(false).then(
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

  allocate_workers() {
    this.errors = [];
    this.messages = [];
    
    const worker_allocation: Worker[][] = this.canvas_element.get_allocation()
    const worker_allocation_parsed = {};

    for(let room_id in worker_allocation) {
      const worker_ids = [];

      for(let allocated_worker of worker_allocation[room_id]) {
        worker_ids.push(allocated_worker._id);
      }

      worker_allocation_parsed[room_id] = worker_ids;
    }

    this.jobService.allocate_workers(this.job['_id'], JSON.stringify(worker_allocation_parsed)).then(
      () => {
        this.messages.push('Uspešno dodeljeni radnici.');
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

}
