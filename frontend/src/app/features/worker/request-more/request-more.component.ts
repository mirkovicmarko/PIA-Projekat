import { Component } from '@angular/core';
import { WorkerService } from '@shared/services/worker.service';

@Component({
  selector: 'app-request-more',
  templateUrl: './request-more.component.html',
  styleUrls: ['./request-more.component.css']
})
export class RequestMoreComponent {
  protected number: number;

  protected messages: string[] = [];
  protected errors: string[] = [];

  constructor(private workerService: WorkerService) { }

  request() {
    this.errors = [];
    this.messages = [];

    this.workerService.more_workers(this.number).then(
      (_response) => this.messages.push('Zahtev je uspešno poslat.'),
      (error) => this.errors = error.error
    );
  }
}
