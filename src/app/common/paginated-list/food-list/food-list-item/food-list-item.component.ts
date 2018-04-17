import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-food-list-item',
  templateUrl: 'food-list-item.component.html',
  styleUrls: [
    'food-list-item.component.css'
  ]
})
export class FoodListItemComponent implements OnInit {

  @Input()item: FoodItem;
  @Input()buttonLabel: string;
  @Output()itemSelected = new EventEmitter<FoodItem>();

  constructor() { }

  ngOnInit() {
  }

  itemButtonClicked(item: FoodItem) {
    this.itemSelected.emit(item);
  }
}
