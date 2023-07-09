import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ObjectsShowComponent } from '../objects-show/objects-show.component';
import Object, { ObjectRoom } from '@shared/models/object';
import { Worker } from '@shared/models/user';

@Component({
  selector: 'app-objects-worker-allocation',
  templateUrl: './objects-worker-allocation.component.html',
  styleUrls: ['./objects-worker-allocation.component.css']
})
export class ObjectsWorkerAllocationComponent implements AfterViewInit, OnInit {
  @Input()
  public object: Object;

  @Input()
  public workers: Worker[];

  @ViewChild('canvasObjects', {static: false})
  private objects_show: ObjectsShowComponent;

  protected selected_workers: Worker[][] = [];

  protected show_workers_modal: boolean = false;

  protected current_room: ObjectRoom = null;

  public get_allocation() {
    return this.selected_workers;
  }

  constructor() { }

  ngOnInit(): void {
    for(let room of this.object.rooms) {
      this.selected_workers[room._id] = [];
    }
  }

  ngAfterViewInit(): void {
    this.objects_show.draw_rooms();

    const canvas_context = this.objects_show.get_canvas_context();
    canvas_context.font = "15px serif";
    canvas_context.fillStyle = "gold";

    for(let room of this.object.rooms) {
      const text = '(' + Math.round(room.position.x) + ',' + Math.round(room.position.y) + ')';
      canvas_context.fillText(text, room.position.x + 5, room.position.y + 15);
    }
  }

  select_workers(room: ObjectRoom) {
    this.current_room = room;
    this.show_workers_modal = true;
  }

  add_worker(selected_worker: Worker) {
    this.workers.splice(this.workers.findIndex(worker => worker._id === selected_worker._id), 1);
    this.selected_workers[this.current_room._id].push(selected_worker);
  }

  remove_worker(room: ObjectRoom, selected_worker: Worker) {
    this.selected_workers[room._id].splice(this.selected_workers[room._id].findIndex(worker => worker._id === selected_worker._id), 1);
    this.workers.push(selected_worker);
  }

  back() {
    this.current_room = null;
    this.show_workers_modal = false;
  }

  round(number: number) {
    return Math.round(number);
  }

}
