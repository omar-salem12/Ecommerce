import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OShop';
  products: IProduct[] =[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {


       this.http.get<IPagination>("https://localhost:5001/api/products?pageSize=5&pageNumber=2").subscribe((respo:IPagination) => {
                    this.products = respo.items

       }, err => {
         console.log(err)
       })

  }

}
