import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agency-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  
  @Input() agency;

}
