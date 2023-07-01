import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { USER_TYPES } from '@shared/consts';
import { AccountService } from '@shared/services/account.service';


@Component({
  selector: 'app-agency-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  user_type: string = USER_TYPES.none;
  user_subscription: Subscription;

  public get USER_TYPES() {
    return USER_TYPES; 
  }
  
  @Input() agency;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.user_subscription = this.accountService.user_change.subscribe((user_type) => this.user_type = user_type);
    this.user_type = this.accountService.user_type;
  }

  ngOnDestroy(): void {
    this.user_subscription.unsubscribe();
  }

}
