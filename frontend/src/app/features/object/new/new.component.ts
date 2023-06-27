import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import { CANVAS_DIMENSIONS, MAX_ROOMS, MIN_ROOMS, OBJECT_TYPES } from '@shared/consts';
import Object, { ObjectRoom } from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';
import { ObjectsMakeComponent } from '@shared/ui/objects-make/objects-make.component';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  @ViewChild('canvasObjects', {static: false})
  private canvas_element: ObjectsMakeComponent;

  current_step: number = 0;

  object: Object = new Object();
  number_of_rooms: number = MIN_ROOMS;

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

  constructor(private objectService: ObjectService) { }

  change_step(direction: number) {
    this.current_step += direction;
  }

  change_object_type() {
    this.object.type = this.object.type == OBJECT_TYPES.flat ? this.OBJECT_TYPES.house : this.OBJECT_TYPES.flat;
  }

  async make() {
    this.errors = [];
    this.messages = [];

    const rooms: ObjectRoom[] = this.canvas_element.get_rooms();

    if(rooms.length != this.number_of_rooms) {
      this.errors.push('Napravite sve sobe.');
      return;
    }

    this.object.rooms = rooms;

    await this.objectService.make(this.object).then(
      () => this.messages.push('Objekat je uspešno kreiran.'),
      (error: HttpErrorResponse) => this.errors = error.error
    );
  }

}
