/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

//USDA Response Objects

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

interface ReportResponse {
  foods: ReportResponseFoodContainer[];
  count: number;
  notfound: number;
  api: number
}

interface ReportResponseFoodContainer {
  food: ReportResponseFood;
}

interface ReportResponseFood {
  sr: string;
  type: string;
  desc: ReportResponseFoodDesc;
  nutrients: ReportResponseFoodNutrient[];
  footnotes: {idv: string, desc: string}[];
}

interface ReportResponseFoodDesc {
  ndbno: string;
  name: string;
  ds: string;
  manu: string;
  ru: string;
}

interface ReportResponseFoodNutrient {
  nutrient_id: string;
  name: string;
  derivation: string;
  group: string;
  unit: string;
  value: string;
  measures: ReportResponseFoodNutrientMeasure[]
}

interface ReportResponseFoodNutrientMeasure {
  label: string;
  eqv: number;
  eunit: string;
  qty: number;
  value: string;
}

// Application DTOs

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

interface FoodReport {
  ndbno: string;
  name: string;
  foodNutrients: FoodNutrient[];
}

interface FoodNutrient {
  nutrientId: string;
  name: string;
  group: string;
  unit: string;
  value: string;
}