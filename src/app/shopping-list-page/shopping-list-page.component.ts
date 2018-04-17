import { Component, OnInit } from '@angular/core';
import { FoodSearchService } from '../food-search.service';
import { MealPlannerService } from '../meal-planner.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: 'shopping-list-page.component.html',
  styleUrls: [
    'shopping-list-page.component.css'
  ]
})
export class ShoppingListPageComponent implements OnInit, AfterViewInit {

  foodReports: FoodReport[];
  totaledNutrientsList: FoodNutrient[] = [];
  items: FoodItem[];
  // Subject to be passed to paginated list so the list knows when
  //  the total number of items has changed and what the new value is
  totalItems$ = new BehaviorSubject<number>(0);
  sumDict: {[key: string]: FoodNutrient} = {};

  constructor(private mealPlannerService: MealPlannerService, private foodSearchService: FoodSearchService) { }

  ngOnInit() {

    this.items = this.mealPlannerService.getShoppingCartItems();
    const ndbnoList = this.items.map(item => {
      return item.ndbno;
    });

    // let sumDict: {[key: string]: FoodNutrient} = {};

    this.foodSearchService.getFoodDetails(ndbnoList).subscribe(foodReports => {

      this.foodReports = foodReports;

      for(let foodReport of this.foodReports) {
        
        for(let nutrient of foodReport.foodNutrients) {

          if(this.sumDict[nutrient.name] === undefined) {
            
            this.sumDict[nutrient.name] = Object.assign({}, nutrient);
          }
          else {

            this.sumDict[nutrient.name].value = (+this.sumDict[nutrient.name].value + +nutrient.value).toString();
          }
        }
      }

      for(let key of Object.getOwnPropertyNames(this.sumDict)) {

        this.totaledNutrientsList.push(this.sumDict[key]);
      }
    });

    this.totalItems$.next(this.items.length);
  }

  ngAfterViewInit() {

    // this.totalItems$.next(this.items.length);
  }

  onItemSelected(item: FoodItem) {

    let foodReport = this.foodReports.find(u => u.ndbno === item.ndbno);

    for(let nutrient of foodReport.foodNutrients) {

      this.sumDict[nutrient.name].value = (+this.sumDict[nutrient.name].value - +nutrient.value).toString();
    }

    this.totaledNutrientsList = [];
    for(let key of Object.getOwnPropertyNames(this.sumDict)) {
      
      this.totaledNutrientsList.push(this.sumDict[key]);
    }

    this.items.splice(this.items.findIndex(u => u.ndbno === item.ndbno), 1);
    this.totalItems$.next(this.items.length);
  }

}
