import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {ShoppingListPageComponent} from "../shopping-list-page/shopping-list-page.component";
import {DetailsPageComponent} from "../details-page/details-page.component";
import {SearchPageComponent} from "../search-page/search-page.component";

const routes: Routes = [
  {path: 'shopping-list', component: ShoppingListPageComponent},
  {path: 'food-details/:id', component: DetailsPageComponent},
  {path: '', pathMatch: 'full', component: SearchPageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouterModule { }
