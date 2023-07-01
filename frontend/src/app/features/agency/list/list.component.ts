import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AgencyService } from '@shared/services/agency.service';

@Component({
  selector: 'app-agency-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  name_filter: string = "";
  address_filter: string = "";

  private agencies;
  filtered_agencies;

  errors: string[] =[];

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.errors = [];
    this.filtered_agencies = [];

    this.agencyService.get_all().then(
      (response) => {
        this.agencies = response;
        this.update();
      },
      (error: HttpErrorResponse) => {
        this.errors.push(error.error);
      }
    );
  }

  update(): void {
    this.filtered_agencies = [];

    for (let agency of this.agencies) {
      this.filtered_agencies.push(agency);
    }

    if (this.name_filter.length > 0) {
      const name_regex: RegExp = new RegExp("^" + this.name_filter, "i");
      this.filtered_agencies =
        this.filtered_agencies.filter((agency) => { return name_regex.test(agency['name']); });
    }

    if (this.address_filter.length > 0) {
      const address_regex: RegExp = new RegExp("^" + this.address_filter, "i");
      this.filtered_agencies =
        this.filtered_agencies.filter((agency) => { return address_regex.test(agency['address']); });
    }
  }

  sort_by(field: string) {
    let sort_function = null;

    switch (field) {
      case "name":
        sort_function = (a, b) => {
          return a['name'].localeCompare(b['name'], "sr");
        }
        break;
      case "address":
        sort_function = (a, b) => {
          return a['address'].localeCompare(b['address'], "sr");
        }
        break;
    }

    if (sort_function != null) {
      this.filtered_agencies = this.filtered_agencies.sort(sort_function);
    }
  }

}
