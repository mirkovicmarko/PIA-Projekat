import { Component, Input } from '@angular/core';
import { OBJECT_TYPES } from '@shared/consts';
import Object from '@shared/models/object';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  public object: Object;

  public get OBJECT_TYPES() {
    return OBJECT_TYPES;
  }

  constructor() { }

}
