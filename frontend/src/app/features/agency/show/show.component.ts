import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USER_TYPES } from '@shared/consts';
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

  constructor(private agencyService: AgencyService, private activeRoute: ActivatedRoute) { }

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
  }

  generate_rating_array(rating: number) {
    return Array(5).fill(0).map((x,i) => rating >= (i + 1));
  }
}
