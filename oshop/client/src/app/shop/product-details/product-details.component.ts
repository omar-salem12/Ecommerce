import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from './../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
 product!:IProduct
 id!:number  | null
  constructor(private shopService:ShopService, private activeRoute:ActivatedRoute,
    private breadCrumb: BreadcrumbService) {

      this.breadCrumb.set('@productDetails',"");
    }

  ngOnInit(): void {
    this.loadProduct()
  }

 loadProduct() {
        this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(product => {
         this.product = product;
         this.breadCrumb.set('@productDetails',product.name)


        },error => {
            console.log(error)

        })
  }

}
