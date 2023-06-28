import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Object from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  protected objects: Object[];

  errors: string[] =[];

  constructor(private objectService: ObjectService) {}

  ngOnInit(): void {
    this.errors = [];
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

}
