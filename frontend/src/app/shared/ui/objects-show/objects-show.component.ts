import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CANVAS_DIMENSIONS } from '@shared/consts';

import { ObjectRoom } from '@shared/models/object';


@Component({
  selector: 'app-objects-show',
  templateUrl: './objects-show.component.html',
  styleUrls: ['./objects-show.component.css']
})
export class ObjectsShowComponent implements AfterViewInit {
  @Input()
  public rooms: ObjectRoom[];

  @ViewChild('canvasObjects', {static: false})
  private canvas_element: ElementRef<HTMLCanvasElement>;
  private canvas: HTMLCanvasElement;

  private canvas_context: CanvasRenderingContext2D;

  public get_canvas() {
    return this.canvas;
  }

  public get_canvas_context() {
    return this.canvas_context;
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.canvas = this.canvas_element.nativeElement;

    this.canvas_context = this.canvas.getContext('2d');

    this.canvas.width = CANVAS_DIMENSIONS;
    this.canvas.height = CANVAS_DIMENSIONS;

    this.draw_rooms();
  }

  public draw_rooms() {
    this.clear_canvas();

    for(let room of this.rooms) {
      this.draw_room(room);
    }

    for(let room of this.rooms) {
      this.draw_doors_of(room);
    }
  }

  public draw_room(room: ObjectRoom, bold: boolean = true) {
    this.canvas_context.lineWidth = bold ? 2 : 1;
    this.canvas_context.strokeStyle = "white";

    this.canvas_context.beginPath();
    this.canvas_context.rect(room.position.x, room.position.y, room.position.width, room.position.height);
    this.canvas_context.stroke();
  }

  public draw_doors_of(room: ObjectRoom) {
    const door_width = 14, door_height = 24;
    this.canvas_context.fillStyle = "peru";

    for(let door of room.doors) {
      this.canvas_context.fillRect(room.position.x + door.position.x - door_width / 2, room.position.y + door.position.y - door_height / 2, door_width, door_height);
    }
  }

  private clear_canvas() {
    this.canvas_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}
