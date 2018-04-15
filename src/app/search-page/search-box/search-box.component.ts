import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: [
    'search-box.component.css'
  ]
})
export class SearchBoxComponent implements OnInit {

  searchText = 'whole milk';
  @Output()onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  searchClicked() {
    this.onSearch.emit(this.searchText);
  }
}
