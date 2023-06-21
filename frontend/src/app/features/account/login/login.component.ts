import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from '@shared/services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  
  errors: string[] = [];

  constructor(private accountService: AccountService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  async login() {
    this.errors = [];

    const current_url: string[] = this.router.url.split('/');
    const admin: boolean = current_url[current_url.length - 1].localeCompare('login') != 0;

    await this.accountService.login(this.username, this.password, admin).then(
      () => this.router.navigate(['agency/list']),
      (error) => this.errors = error.error
    );
  }
}
