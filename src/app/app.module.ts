import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ShoppingListPageComponent } from './shopping-list-page/shopping-list-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PaginatedListComponent } from './common/paginated-list/paginated-list.component';
import { FoodListComponent } from './common/paginated-list/food-list/food-list.component';
import { PaginationControlsComponent } from './common/paginated-list/pagination-controls/pagination-controls.component';
import { FoodListItemComponent } from './common/paginated-list/food-list/food-list-item/food-list-item.component';
import {AppRouterModule} from "./router/app-router.module";
import { SearchBoxComponent } from './search-page/search-box/search-box.component';
import { NutritionInfoComponent } from './common/nutrition-info/nutrition-info.component';


@NgModule({

  declarations: [
    AppComponent,
    SearchPageComponent,
    ShoppingListPageComponent,
    DetailsPageComponent,
    PaginatedListComponent,
    FoodListComponent,
    PaginationControlsComponent,
    FoodListItemComponent,
    SearchBoxComponent,
    NutritionInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
