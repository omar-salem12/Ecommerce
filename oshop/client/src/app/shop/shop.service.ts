import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from './../shared/models/brand';
import { IProductType } from './../shared/models/productType';
import {map} from 'rxjs/operators'
import { ShopParams } from './../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

 private baseUrl = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

    getProducts(shopParams: ShopParams) {

        let params = new HttpParams();

        if(shopParams.typeIdSelected !== 0)
        {
         params =  params.append("typeId", shopParams.typeIdSelected.toString());
        }
        if(shopParams.brandIdSelected !==0)
        {
          params =  params.append("brandId", shopParams.brandIdSelected.toString());
        }

        params = params.append("OrderBy",shopParams.sortSelected);

        params = params.append("pageNumber", shopParams.pageNumber.toString());
        params = params.append("pageSize", shopParams.pageSize.toString());
       if(shopParams.search) {
         params = params.append("search",shopParams.search)
       }

        return this.http.get<IPagination>(this.baseUrl + 'products',{observe:"response",params})
           .pipe(
             map(response =>{ return response.body})
           )
    }

    getBrands() {
      return this.http.get<IProductBrand[]>(this.baseUrl + 'products/brands')
    }

    getTypes() {
      return this.http.get<IProductType[]>(this.baseUrl + 'products/types')
    }

}
