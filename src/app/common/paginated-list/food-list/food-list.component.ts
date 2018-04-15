import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: 'food-list.component.html',
  styleUrls: [
    'food-list.component.css'
  ]
})
export class FoodListComponent implements OnInit {

  @Input()items: FoodItem;
  @Output()onItemSelected = new EventEmitter<FoodItem>();

  constructor() { }

  ngOnInit() {
  }

  itemSelected(item: FoodItem){
    this.onItemSelected.emit(item);
  }
}
