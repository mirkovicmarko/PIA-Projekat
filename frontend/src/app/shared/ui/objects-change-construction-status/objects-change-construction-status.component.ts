import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ObjectsShowComponent } from '../objects-show/objects-show.component';
import Object from '@shared/models/object';
import { CONSTRUCTION_STATUSES } from '@shared/consts';

@Component({
  selector: 'app-objects-change-construction-status',
  templateUrl: './objects-change-construction-status.component.html',
  styleUrls: ['./objects-change-construction-status.component.css']
})
export class ObjectsChangeConstructionStatusComponent implements OnInit {
  @Input()
  public object: Object;

  @ViewChild('canvasObjects', {static: false})
  private objects_show: ObjectsShowComponent;

  private updated_rooms: string[] = [];

  public get_updated_rooms() {
    return this.updated_rooms;
  }

  constructor() { }

  ngOnInit(): void {
  }

  click_event(event) {
    const room = this.get_room_under(event.offsetX, event.offsetY);

    if(!room) return;

    room.reconstruction_status = CONSTRUCTION_STATUSES.done;
    this.objects_show.draw_rooms();
    this.updated_rooms.push(room._id);
  }

  private get_room_under(x: number, y: number) {
    for(let room of this.object.rooms) {
      if(room.position.x + room.position.width >= x && room.position.x <= x
        && room.position.y + room.position.height >= y && room.position.y <= y
      ) return room;
    }
    return null;
  }

}
