import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { OBJECT_TYPES } from '@shared/consts';
import Object from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';

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

  constructor(private objectService: ObjectService) { }

  erase(object: Object) {
    this.objectService.erase(object._id).then(
      () => {
        alert('Uspešno obrisan objekat.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

}
