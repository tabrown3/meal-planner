import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-paginated-list',
  templateUrl: 'paginated-list.component.html',
  styleUrls: [
    'paginated-list.component.css'
  ]
})
export class PaginatedListComponent implements OnInit {

  // for <food-list>
  @Input()list: any[];

  // for <pagination-control>
  @Input()pageSize: number;
  @Input()totalItems$: Subject<number>;
  @Output()onPageChange = new EventEmitter<PageDetail>();
  @Output()onItemSelected = new EventEmitter<FoodItem>();

  constructor() { }

  ngOnInit() {
  }

  pageChange(pageDetail: PageDetail) {
    this.onPageChange.emit(pageDetail);
  }

  itemSelected(item: FoodItem) {
    this.onItemSelected.emit(item);
  }
}
