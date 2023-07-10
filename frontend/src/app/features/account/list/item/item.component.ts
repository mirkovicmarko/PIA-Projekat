import { Component, Input, OnInit } from '@angular/core';
import { USER_TYPES } from '@shared/consts';
import User from '@shared/models/user';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  public user: User;

  public get USER_TYPES() {
    return USER_TYPES;
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  remove() {
    this.accountService.ban(this.user._id).then(
      () => {
        alert('Uspešno obrisan korisnik.');
        window.location.reload();
      }
    );
  }

  ban() {
    this.accountService.ban(this.user._id).then(
      () => {
        alert('Uspešno zabranjen pristup korisniku.');
        window.location.reload();
      }
    );
  }

  allow() {
    this.accountService.allow(this.user._id).then(
      () => {
        alert('Uspešno dozvoljen pristup korisniku.');
        window.location.reload();
      }
    );
  }

}
