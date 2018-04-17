import { Component, OnInit } from '@angular/core';
import {FoodSearchService} from "../food-search.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-page',
  templateUrl: 'details-page.component.html',
  styleUrls: [
    'details-page.component.css'
  ]
})
export class DetailsPageComponent implements OnInit {

  foodReport: FoodReport;

  constructor(private foodSearchService: FoodSearchService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.foodSearchService.getFoodDetails([
        params[this.foodSearchService.PARAM_NDBNO]
      ]).subscribe(foodReports => {

        this.foodReport = foodReports[0]; // only one on details page
      });
    });
  }

}
