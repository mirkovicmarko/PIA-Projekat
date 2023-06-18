import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  content_loaded: boolean = false;
  error_occured: boolean = false;
  error_message: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.check_login().then(
      () => this.content_loaded = true,
      (error: HttpErrorResponse) => { this.error_occured = true, this.error_message = error.message }
    );
  }

}
