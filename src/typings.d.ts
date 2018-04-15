/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface SearchResponse {
  list: SearchResponseList
}

interface SearchResponseList {
  q: string;
  sr: string;
  ds: string;
  start: number;
  end: number;
  total: number;
  group: string;
  sort: string;
  item: SearchResponseItem[];
}

interface SearchResponseItem {
  offset: number;
  group: string;
  name: string;
  ndbno: string;
  ds: string;
}

interface SearchResult {
  start: number;
  end: number;
  total: number;
  items: FoodItem[];
}

interface FoodItem {
  foodGroup: string;
  name: string;
  ndbno: string;
}

interface PageDetail {
  pageNumber: number;
  topItemOffset: number;
}