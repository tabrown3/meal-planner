import { Component, OnInit } from '@angular/core';
import {MealPlannerService} from "../meal-planner.service";
import {FoodSearchService} from "../food-search.service";
import {Subject} from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-search-page',
  templateUrl: 'search-page.component.html',
  styleUrls: [
    'search-page.component.css'
  ]
})
export class SearchPageComponent implements OnInit {

  items: FoodItem[];
  // Subject to be passed to paginated list so the list knows when
  //  the total number of items has changed and what the new value is
  totalItems$ = new BehaviorSubject<number>(0);
  searchText = 'whole milk';

  constructor(private mealPlannerService: MealPlannerService, private foodSearchService: FoodSearchService) { }

  ngOnInit() {
    this.performFoodSearch();
  }

  onPageChange(pageDetail: PageDetail) {
    this.foodSearchService.getFoodList(this.searchText, pageDetail.topItemOffset).subscribe(result => {
      this.items = result.items;
    });
  }

  onItemSelected(foodItem: FoodItem) {
    this.mealPlannerService.addItemToCart(foodItem);
    console.log(foodItem);
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
    this.performFoodSearch();
  }

  private performFoodSearch() {
    this.foodSearchService.getFoodList(this.searchText, 0).subscribe(result => {
      this.items = result.items;
      this.totalItems$.next(result.total);
    });
  }
}
