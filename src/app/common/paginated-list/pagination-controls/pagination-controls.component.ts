import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-pagination-controls',
  templateUrl: 'pagination-controls.component.html',
  styleUrls: [
    'pagination-controls.component.css'
  ]
})
export class PaginationControlsComponent implements OnInit {

  @Input()pageSize: number;
  @Input()totalItems$: Subject<number>;
  @Output()onPageChange = new EventEmitter<PageDetail>();

  currentPage = 1;
  lastPage = 0; // must be initialized in totalItems$
  // totalItems = 0; // must be initialized in totalItems$
  initialized = false; // must be set in totalItems$

  constructor() { }

  ngOnInit() {

    this.totalItems$.subscribe(totalItems => {
      this.currentPage = 1;
      this.lastPage = Math.ceil(totalItems / this.pageSize);
      this.initialized = true;
    });
  }

  nextPage() {
    if(this.initialized && this.currentPage < this.lastPage) {
      this.currentPage++;
      this.onPageChange.emit(this.createPageDetail());
    }
  }

  previousPage() {
    if(this.initialized && this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange.emit(this.createPageDetail());
    }
  }

  private createPageDetail(): PageDetail {
    return {
      pageNumber: this.currentPage,
      topItemOffset: ((this.currentPage - 1) * this.pageSize)
    }
  };
}
