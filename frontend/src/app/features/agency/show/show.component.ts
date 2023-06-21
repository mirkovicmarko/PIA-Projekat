import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
}
