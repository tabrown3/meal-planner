import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nutrition-info',
  templateUrl: 'nutrition-info.component.html',
  styleUrls: [
    'nutrition-info.component.css'
  ]
})
export class NutritionInfoComponent implements OnInit {

  @Input()foodNutrients: FoodNutrient[];

  constructor() { }

  ngOnInit() {
  }

}
