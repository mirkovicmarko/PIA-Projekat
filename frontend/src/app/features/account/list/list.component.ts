import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  protected users;

  protected errors: string[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.get_all().then(
      (users) => {
        this.users = users;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

}
