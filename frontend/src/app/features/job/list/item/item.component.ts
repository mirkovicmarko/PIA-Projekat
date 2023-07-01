import { Component, Input, OnInit } from '@angular/core';
import { USER_TYPES } from '@shared/consts';
import { AccountService } from '@shared/services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  public job;

  user_type: string;

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user_type = this.accountService.user_type;
  }

  protected format_date(date: string) {
    const date_object = new Date(date);

    const day = date_object.getDate();
    const month = date_object.getMonth() + 1;
    const year = date_object.getFullYear();

    const day_format = (day < 10 ? '0' : '') + day;
    const month_format = (month < 10 ? '0' : '') + month;
    const year_format = year;

    return day + '/' + month + '/' + year;
  }
}
