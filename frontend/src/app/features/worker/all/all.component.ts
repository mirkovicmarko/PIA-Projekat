import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from '@shared/models/user';
import { WorkerService } from '@shared/services/worker.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  
  protected errors: string[] = [];

  protected workers: Worker[] = [];

  protected agency_id: string;

  constructor(private workerService: WorkerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.errors = [];
    this.workers = [];

    this.agency_id = this.activatedRoute.snapshot.queryParams['id'];

    this.workerService.get_all(undefined, this.agency_id).then(
      (workers: Worker[]) => {
        this.workers = workers;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  erase(id: string) {
    this.workerService.erase(id, this.agency_id).then(
      () => {
        alert('Uspešno obrisan radnik.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

}
