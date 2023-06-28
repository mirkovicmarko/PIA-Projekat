import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ObjectRoom, ObjectRoomDoor } from '@shared/models/object';
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
  public rooms: ObjectRoom[];

  @ViewChild('canvasObjects', {static: false})
  private objects_show: ObjectsShowComponent;

  protected current_room: ObjectRoom = null;
  protected current_door: ObjectRoomDoor = null;
  protected current_room_under_door: ObjectRoom = null;

  public get_rooms() {
    return this.rooms;
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.objects_show.get_canvas().addEventListener('click', (event) => this.click_event(event));
    this.objects_show.get_canvas().addEventListener('mousemove', (event) => this.move_event(event));

    if(this.rooms.length > this.max_num_of_rooms) {
      this.rooms.splice(this.max_num_of_rooms - 1, this.rooms.length - this.max_num_of_rooms);
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

    this.current_room = this.rooms.splice(this.rooms.indexOf(room), 1)[0];
  }

  protected delete_room(room: ObjectRoom) {
    if(this.current_door !== null || this.current_room !== null) return;

    this.rooms.splice(this.rooms.indexOf(room), 1);

    this.objects_show.draw_rooms();
  }

  private click_event(event) {
    if((this.current_room === null || this.rooms_colliding_with_current()) && this.current_door === null) return;

    if(this.current_room !== null) {
      this.rooms.push(this.current_room);
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

      this.current_door.x = event.clientX - bounding_rectange.left;
      this.current_door.y = event.clientY - bounding_rectange.top;

      this.current_room_under_door = this.get_room_under(this.current_door.x, this.current_door.y);
      if (this.current_room_under_door !== null) {
        const left = this.current_door.x - this.current_room_under_door.position.x;
        const right = this.current_room_under_door.position.x + this.current_room_under_door.position.width - this.current_door.x;
        const bottom = this.current_room_under_door.position.y + this.current_room_under_door.position.height - this.current_door.y;
        const top = this.current_door.y - this.current_room_under_door.position.y;

        if (left <= right && left <= top && left <= bottom) {
          this.current_door.x = this.current_door.x - left;
        } else if (right <= left && right <= top && right <= bottom) {
          this.current_door.x = this.current_door.x + right;
        } else if (top <= left && top <= right && top <= bottom) {
          this.current_door.y = this.current_door.y - top;
        } else {
          this.current_door.y = this.current_door.y + bottom;
        }

        this.current_door.x = this.current_door.x - this.current_room_under_door.position.x;
        this.current_door.y = this.current_door.y - this.current_room_under_door.position.y;

        this.current_room_under_door.doors.push(this.current_door);
      }
    }
    else if (this.current_room !== null) {
      let old_x = this.current_room.position.x;
      let old_y = this.current_room.position.y;

      this.current_room.position.x = event.clientX - bounding_rectange.left;
      this.current_room.position.y = event.clientY - bounding_rectange.top;

      if (this.rooms_colliding_with_current()) {
        this.current_room.position.x = old_x;
        this.current_room.position.y = old_y;
        return;
      }
    }
    
    this.objects_show.draw_rooms();
    if(this.current_room !== null) {
      this.objects_show.draw_room(this.current_room);
      this.objects_show.draw_doors_of(this.current_room);
    }
  }

  private rooms_colliding_with_current() {
    for(let room of this.rooms) {
      if(room.position.x + room.position.width > this.current_room.position.x
        && room.position.x < this.current_room.position.x + this.current_room.position.width
        && room.position.y + room.position.height > this.current_room.position.y
        && room.position.y < this.current_room.position.y + this.current_room.position.height
      ) return true;
    }
    return false;
  }

  private get_room_under(x: number, y: number) {
    for(let room of this.rooms) {
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
        door.x == 0 && door.y >= 0 && door.y <= room.position.height ||
        door.x == room.position.width && door.y >= 0 && door.y <= room.position.height ||
        door.y == 0 && door.x >= 0 && door.x <= room.position.width ||
        door.y == room.position.height && door.x >= 0 && door.x <= room.position.width
      ) {
        valid_doors.push(door);
      }
    }

    room.doors = valid_doors;
  }
}
