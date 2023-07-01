import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { USER_TYPES } from '@shared/consts';
import { AccountService } from '@shared/services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user_type: string = USER_TYPES.none;
  user_subscription: Subscription;

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user_subscription = this.accountService.user_change.subscribe((user_type) => this.user_type = user_type);
    this.user_type = this.accountService.user_type;
  }

  ngOnDestroy(): void {
    this.user_subscription.unsubscribe();
  }

  async logout() {
    await this.accountService.logout();
  }

}
