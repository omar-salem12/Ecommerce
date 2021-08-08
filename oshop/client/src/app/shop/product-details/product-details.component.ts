import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from './../shop.service';
import { BasketService } from './../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
 product!:IProduct;
 quantity = 1;
 id!:number  | null
  constructor(private shopService:ShopService, private activeRoute:ActivatedRoute,
    private breadCrumb: BreadcrumbService, private basketServie: BasketService) {

      this.breadCrumb.set('@productDetails',"");
    }



  ngOnInit(): void {
    this.loadProduct()
  }

  addItemToBasket() {
      this.basketServie.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
      this.quantity++;
  }

  decrementQantity() {
    if(this.quantity > 1) {
    this.quantity--;
    }
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
