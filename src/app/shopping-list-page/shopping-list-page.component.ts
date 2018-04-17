import { Component, OnInit } from '@angular/core';
import { FoodSearchService } from '../food-search.service';
import { MealPlannerService } from '../meal-planner.service';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: 'shopping-list-page.component.html',
  styleUrls: [
    'shopping-list-page.component.css'
  ]
})
export class ShoppingListPageComponent implements OnInit {

  totaledNutrientsList: FoodNutrient[] = [];

  constructor(private mealPlannerService: MealPlannerService, private foodSearchService: FoodSearchService) { }

  ngOnInit() {

    const ndbnoList = this.mealPlannerService.getShoppingCartItems().map(item => {
      return item.ndbno;
    });

    let sumDict: {[key: string]: FoodNutrient} = {};

    this.foodSearchService.getFoodDetails(ndbnoList).subscribe(foodReports => {

      for(let foodReport of foodReports) {
        
        for(let nutrient of foodReport.foodNutrients) {

          if(sumDict[nutrient.name] === undefined) {
            
            sumDict[nutrient.name] = Object.assign({}, nutrient);
          }

          sumDict[nutrient.name].value = (+sumDict[nutrient.name].value + +nutrient.value).toString();
        }
      }

      for(let key of Object.getOwnPropertyNames(sumDict)) {

        this.totaledNutrientsList.push(sumDict[key]);
      }
    });
  }

}
