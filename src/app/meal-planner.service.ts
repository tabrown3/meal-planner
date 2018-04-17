import { Injectable } from '@angular/core';
import {FoodSearchService} from "./food-search.service";

@Injectable()
export class MealPlannerService {

  private shoppingCart: FoodItem[] = [];

  constructor() { }

  addItemToCart(foodItem: FoodItem) {

    if(this.shoppingCart.length < 25) {
      this.shoppingCart.push(foodItem);
    }
  }

  getShoppingCartItems() {

    return [...this.shoppingCart];
  }
}
