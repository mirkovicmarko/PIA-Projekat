import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OBJECT_TYPES } from '@shared/consts';
import Object from '@shared/models/object';


@Component({
  selector: 'app-request-job-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  public object: Object;

  @Output()
  choosen_object_event = new EventEmitter<string>();

  public get OBJECT_TYPES() {
    return OBJECT_TYPES;
  }

  constructor() { }

  ngOnInit(): void {
  }

  choose() {
    this.choosen_object_event.emit(this.object._id);
  }

}
