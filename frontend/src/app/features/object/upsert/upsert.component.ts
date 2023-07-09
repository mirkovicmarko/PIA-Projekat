import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CANVAS_DIMENSIONS, MAX_ROOMS, MIN_ROOMS, OBJECT_TYPES } from '@shared/consts';
import Object, { ObjectRoom } from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';
import { UtilService } from '@shared/services/util.service';
import { ObjectsMakeComponent } from '@shared/ui/objects-make/objects-make.component';


@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class UpsertComponent implements OnInit {
  
  @ViewChild('canvasObjects', {static: false})
  private canvas_element: ObjectsMakeComponent;

  current_step: number = 0;

  protected id: string = undefined;

  object: Object = new Object();
  number_of_rooms: number = MIN_ROOMS;

  protected reveal_JSON_upload: boolean = false;

  errors: string[] = [];
  messages: string[] = [];

  public get OBJECT_TYPES() {
    return OBJECT_TYPES; 
  }

  public get MIN_ROOMS() {
    return MIN_ROOMS; 
  }

  public get MAX_ROOMS() {
    return MAX_ROOMS; 
  }

  public get CANVAS_DIMENSIONS() {
    return CANVAS_DIMENSIONS;
  }

  constructor(private objectService: ObjectService, private activeRoute: ActivatedRoute, private router: Router, private utilService: UtilService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.queryParams['id'];
    if(this.id !== undefined) {
      this.objectService.get(this.id).then(
        (object: Object) => {
          this.number_of_rooms = object.rooms.length;
          this.object = object;
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/account/login']);
        }
      );
    }
  }

  change_step(direction: number) {
    this.current_step += direction;
  }

  change_object_type() {
    this.object.type = this.object.type == OBJECT_TYPES.flat ? this.OBJECT_TYPES.house : this.OBJECT_TYPES.flat;
  }

  async upsert() {
    this.errors = [];
    this.messages = [];

    const rooms: ObjectRoom[] = this.canvas_element.get_rooms();

    if(rooms.length != this.number_of_rooms) {
      this.errors.push('Napravite sve sobe.');
      return;
    }

    this.object.rooms = rooms;

    if(this.id === undefined) {
      await this.objectService.make(this.object).then(
        () => this.messages.push('Objekat je uspešno kreiran.'),
        (error: HttpErrorResponse) => this.errors = error.error
      );
    } else {
      await this.objectService.change(this.object).then(
        () => this.messages.push('Objekat je uspešno izmenjen.'),
        (error: HttpErrorResponse) => this.errors = error.error
      );
    }
  }

  load_JSON(event) {
    this.utilService.data_file_to_text(event.target.files[0]).then(
      (text: string) => {
        this.object = JSON.parse(text);
        this.number_of_rooms = this.object.rooms.length;
        this.reveal_JSON_upload = false;
      }
    );
  }
}
