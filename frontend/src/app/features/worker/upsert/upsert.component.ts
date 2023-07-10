import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Worker } from '@shared/models/user';
import { WorkerService } from '@shared/services/worker.service';


@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class UpsertComponent implements OnInit {

  protected worker: Worker = new Worker();

  private id: string = undefined;

  public messages: string[] = [];
  public errors: string[] = [];

  private agency_id: string;

  constructor(private workerService: WorkerService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.queryParams['id'];
    this.agency_id = this.activeRoute.snapshot.queryParams['agency_id'];

    if(this.id !== undefined) {
      this.workerService.get(this.id, this.agency_id).then(
        (worker: Worker) => {
          this.worker = worker;
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/account/login']);
        }
      );
    }
  }

  async confirm() {
    this.errors = [];
    this.messages = [];

    if(this.id === undefined) {
      await this.workerService.insert(this.worker, this.agency_id).then(
        () => this.messages.push('Radnik je uspešno ubačen.'),
        (error: HttpErrorResponse) => this.errors = error.error
      );
    } else {
      await this.workerService.edit(this.worker, this.agency_id).then(
        () => this.messages.push('Radnik je uspešno ažuriran.'),
        (error: HttpErrorResponse) => this.errors = error.error
      );
    }
  }

}
