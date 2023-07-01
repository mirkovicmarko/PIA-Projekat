import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.errors = [];
    this.workers = [];

    this.workerService.get_all().then(
      (workers: Worker[]) => {
        this.workers = workers;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  erase(id: string) {
    this.workerService.erase(id).then(
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
