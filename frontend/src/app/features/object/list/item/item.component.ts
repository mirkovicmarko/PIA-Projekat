import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { OBJECT_TYPES } from '@shared/consts';
import Object from '@shared/models/object';
import { ObjectService } from '@shared/services/object.service';

@Component({
  selector: 'app-object-list-item',
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

  erase() {
    this.objectService.erase(this.object._id).then(
      () => {
        alert('Uspešno obrisan objekat.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  JSON_download() {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.object));
    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.style.display = "none";
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", "object.json");
    
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}
