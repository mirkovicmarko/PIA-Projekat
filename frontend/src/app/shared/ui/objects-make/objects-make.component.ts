import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import Object, { ObjectRoom, ObjectRoomDoor } from '@shared/models/object';
import { ObjectsShowComponent } from '../objects-show/objects-show.component';

@Component({
  selector: 'app-objects-make',
  templateUrl: './objects-make.component.html',
  styleUrls: ['./objects-make.component.css']
})
export class ObjectsMakeComponent implements AfterViewInit {
  @Input()
  public max_num_of_rooms: number;
  @Input()
  public object: Object;

  @ViewChild('canvasObjects', {static: false})
  private objects_show: ObjectsShowComponent;

  protected current_room: ObjectRoom = null;
  protected current_door: ObjectRoomDoor = null;
  protected current_room_under_door: ObjectRoom = null;

  public get_rooms() {
    return this.object.rooms;
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.objects_show.get_canvas().addEventListener('click', (event) => this.click_event(event));
    this.objects_show.get_canvas().addEventListener('mousemove', (event) => this.move_event(event));

    if(this.object.rooms.length > this.max_num_of_rooms) {
      this.object.rooms.splice(this.max_num_of_rooms - 1, this.object.rooms.length - this.max_num_of_rooms);
    }

    this.objects_show.draw_rooms();
  }

  protected new_room() {
    this.current_room = new ObjectRoom();
    this.current_room.position.width = 200;
    this.current_room.position.height = 200;
  }

  protected new_door() {
    if(this.current_door !== null || this.current_room !== null) return;

    this.current_door = new ObjectRoomDoor();
  }

  protected edit_room(room: ObjectRoom) {
    if(this.current_door !== null || this.current_room !== null) return;

    this.current_room = this.object.rooms.splice(this.object.rooms.indexOf(room), 1)[0];
  }

  protected delete_room(room: ObjectRoom) {
    if(this.current_door !== null || this.current_room !== null) return;

    this.object.rooms.splice(this.object.rooms.indexOf(room), 1);

    this.objects_show.draw_rooms();
  }

  private click_event(event) {
    if((this.current_room === null || this.rooms_colliding_with_current()) && this.current_door === null) return;

    if(this.current_room !== null) {
      this.object.rooms.push(this.current_room);
      this.current_room = null;
    }
    else if(this.current_door !== null) {
      if(this.current_room_under_door === null) return;

      // Door is already in the room.
      this.current_room_under_door = null;
      this.current_door = null;
    }

    this.objects_show.draw_rooms();
  }

  private move_event(event) {
    if (this.current_room === null && this.current_door === null) return;

    const bounding_rectange = this.objects_show.get_canvas().getBoundingClientRect();

    if (this.current_door !== null) {
      if (this.current_room_under_door !== null) {
        this.current_room_under_door.doors.splice(this.current_room_under_door.doors.indexOf(this.current_door));
      }

      this.current_door.position.x = event.clientX - bounding_rectange.left;
      this.current_door.position.y = event.clientY - bounding_rectange.top;

      this.current_room_under_door = this.get_room_under(this.current_door.position.x, this.current_door.position.y);
      if (this.current_room_under_door !== null) {
        const left = this.current_door.position.x - this.current_room_under_door.position.x;
        const right = this.current_room_under_door.position.x + this.current_room_under_door.position.width - this.current_door.position.x;
        const bottom = this.current_room_under_door.position.y + this.current_room_under_door.position.height - this.current_door.position.y;
        const top = this.current_door.position.y - this.current_room_under_door.position.y;

        if (left <= right && left <= top && left <= bottom) {
          this.current_door.position.x = this.current_door.position.x - left;
        } else if (right <= left && right <= top && right <= bottom) {
          this.current_door.position.x = this.current_door.position.x + right;
        } else if (top <= left && top <= right && top <= bottom) {
          this.current_door.position.y = this.current_door.position.y - top;
        } else {
          this.current_door.position.y = this.current_door.position.y + bottom;
        }

        this.current_door.position.x = this.current_door.position.x - this.current_room_under_door.position.x;
        this.current_door.position.y = this.current_door.position.y - this.current_room_under_door.position.y;

        this.current_room_under_door.doors.push(this.current_door);
      }
    }
    else if (this.current_room !== null) {
      const new_x = event.clientX - bounding_rectange.left;
      const new_y = event.clientY - bounding_rectange.top;
      this.calculate_current_room_new_postition(new_x, new_y);
    }
    
    this.objects_show.draw_rooms();
    if(this.current_room !== null) {
      this.objects_show.draw_room(this.current_room);
      this.objects_show.draw_doors_of(this.current_room);
    }
  }

  private calculate_current_room_new_postition(new_x: number, new_y: number) {
    const old_x = this.current_room.position.x;
    const old_y = this.current_room.position.y;

    this.current_room.position.x = new_x;
    this.current_room.position.y = new_y;
    if (!this.rooms_colliding_with_current()) {
      return;
    }

    this.current_room.position.x = old_x;
    this.current_room.position.y = new_y;
    if (!this.rooms_colliding_with_current()) {
      return;
    }

    this.current_room.position.x = new_x;
    this.current_room.position.y = old_y;
    if (!this.rooms_colliding_with_current()) {
      return;
    }

    this.current_room.position.x = old_x;
    this.current_room.position.y = old_y;
  }

  private rooms_colliding_with_current() {
    for(let room of this.object.rooms) {
      if(room.position.x + room.position.width > this.current_room.position.x
        && room.position.x < this.current_room.position.x + this.current_room.position.width
        && room.position.y + room.position.height > this.current_room.position.y
        && room.position.y < this.current_room.position.y + this.current_room.position.height
      ) return true;
    }
    return false;
  }

  private get_room_under(x: number, y: number) {
    for(let room of this.object.rooms) {
      if(room.position.x + room.position.width >= x && room.position.x <= x
        && room.position.y + room.position.height >= y && room.position.y <= y
      ) return room;
    }
    return null;
  }

  protected fix_doors(room: ObjectRoom) {
    const valid_doors: ObjectRoomDoor[] = [];

    for (let door of room.doors) {
      if (
        door.position.x == 0 && door.position.y >= 0 && door.position.y <= room.position.height ||
        door.position.x == room.position.width && door.position.y >= 0 && door.position.y <= room.position.height ||
        door.position.y == 0 && door.position.x >= 0 && door.position.x <= room.position.width ||
        door.position.y == room.position.height && door.position.x >= 0 && door.position.x <= room.position.width
      ) {
        valid_doors.push(door);
      }
    }

    room.doors = valid_doors;
  }
}
