import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Object from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';

@Component({
  selector: 'app-request-job-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output()
  choosen_object_event = new EventEmitter<string>();

  protected objects: Object[];

  errors: string[] =[];

  constructor(private objectService: ObjectService) { }

  ngOnInit(): void {
    this.objects = [];

    this.objectService.get_all().then(
      (objects: Object[]) => {
        this.objects = objects;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  choosen(choosen_object: string) {
    this.choosen_object_event.emit(choosen_object);
  }

}
