import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@shared/services/account.service';

import { AgencyService } from '@shared/services/agency.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  agency;

  agency_loaded: boolean = false;

  errors: string[] = [];

  protected user_id: string;

  constructor(private agencyService: AgencyService, private activeRoute: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    const agency_id = this.activeRoute.snapshot.queryParams['id'];

    this.agencyService.get(agency_id).then(
      (response) => {
        this.agency = response;
        this.agency_loaded = true;
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );

    this.user_id = this.accountService.user_id;
  }

  generate_rating_array(rating: number) {
    return Array(5).fill(0).map((x,i) => rating >= (i + 1));
  }

  delete_comment() {
    this.agencyService.delete_rating(this.agency['_id']).then(
      () => {
        alert('Uspešno ste obrisali ocenu.');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
}
