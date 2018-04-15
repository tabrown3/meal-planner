import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FoodSearchService {

  private readonly API_KEY = '0eSJ5Bwjti3Ck1Yvj3Nk9xkwuQtuaaK7xcw9zYv1';
  private readonly FORMAT = 'json';

  private readonly FOOD_SEARCH_URL = 'https://api.nal.usda.gov/ndb/search';
  private readonly FOOD_REPORT_URL = 'https://api.nal.usda.gov/ndb/V2/reports';

  // common params
  private readonly PARAM_API_KEY = 'api_key';
  private readonly PARAM_FORMAT = 'format';

  // search params
  private readonly PARAM_QUERY = 'q';
  private readonly PARAM_MAX = 'max';
  private readonly PARAM_OFFSET = 'offset';

  // report params
  readonly PARAM_NDBNO = 'ndbno';
  private readonly PARAM_TYPE = 'type';

  constructor(private httpClient: HttpClient) { }

  getFoodList = (searchQuery: string, offset: number): Observable<SearchResult> => {

    let params = new HttpParams();
    params = params.append(this.PARAM_API_KEY, this.API_KEY);
    params = params.append(this.PARAM_FORMAT, this.FORMAT);
    params = params.append(this.PARAM_QUERY, searchQuery);
    params = params.append(this.PARAM_MAX, '25');
    params = params.append(this.PARAM_OFFSET, offset.toString());

    return this.httpClient.get(this.FOOD_SEARCH_URL, {
      params: params
    }).pipe(map((res: SearchResponse) => {

      return {
        start: res.list.start,
        end: res.list.end,
        total: res.list.total,
        items: itemsMap(res.list.item)
      };

      function itemsMap(inItems: SearchResponseItem[]) {

        return inItems.map(inItem => {

          return {
            foodGroup: inItem.group,
            name: inItem.name,
            ndbno: inItem.ndbno
          }
        });
      }
    }));
  }

  getFoodDetails = (ndbnoList: string[]): Observable<FoodReport[]> => {

    let params = new HttpParams();
    params = params.append(this.PARAM_API_KEY, this.API_KEY);
    params = params.append(this.PARAM_FORMAT, this.FORMAT);
    params = params.append(this.PARAM_TYPE, 'b');

    for(let ndbno of ndbnoList) {
      params = params.append(this.PARAM_NDBNO, ndbno);
    }

    return this.httpClient.get(this.FOOD_REPORT_URL, {
      params: params
    }).pipe(map((inItem: ReportResponse) => {

      return inItem.foods.map(value => {

        let foodReport: FoodReport = {
          ndbno: value.food.desc.ndbno,
          name: value.food.desc.name,
          foodNutrients: null // added below
        };

        foodReport.foodNutrients = value.food.nutrients.map(nutrient => {

          return {
            nutrientId: nutrient.nutrient_id,
            name: nutrient.name,
            group: nutrient.group,
            unit: nutrient.unit,
            value: nutrient.value
          }
        });

        return foodReport;
      });
    }));
  }
}
