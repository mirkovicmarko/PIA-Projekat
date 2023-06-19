import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void { }

  async login() {
    this.errors = [];

    await this.accountService.login(this.username, this.password).then(
      () => this.router.navigate(['radionice/prikazi_listu'], { queryParams: { tip: 'aktuelne' }}),
      (error) => this.errors = error.error
    );
  }
}
