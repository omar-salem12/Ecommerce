import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IProductBrand } from './../shared/models/brand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from './../shared/models/shopParams';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false}) searchTerm!: ElementRef
  products: IProduct[]
  brands: IProductBrand[]
  types: IProductType[]
  shopParams = new ShopParams();
  totalCount! : number;

 sortOptions  = [
   {name: "Alphabetical" ,value:"name"},
   {name: "Price: Low to High", value:"priceAsc"},
   {name:"Price: High to Low", value:"priceDes"}
 ]

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {

     this.getProducts();
     this.getBrands();
     this.getTypes()
  }

  getProducts() {
      this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response!.items
      this.shopParams.pageNumber = response!.pageNumber
      this.shopParams.pageSize =response!.pageSize;
      this.totalCount = response!.totalCount
     }, error => {
       console.log(error);
     })
  }


  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id:0, name:'All'},...response];
    }, error => {
      console.log(error);
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id:0, name:'All'},...response];

    }, error => {
      console.log(error)
    })
  }

  onBrandSelected(brandId: number) {

    this.shopParams.brandIdSelected = brandId;
    this.shopParams.pageNumber = 1

    this.getProducts();


  }

  onTypeSelected(typeId: number) {

    this.shopParams.typeIdSelected = typeId;
    this.shopParams.pageNumber = 1
    this.getProducts()

  }

  onSortSelected(e:any)
  {
     this.shopParams.sortSelected = e.target.value;
     this.getProducts();


  }

  onPageChange(event: any) {
  if(this.shopParams.pageNumber !== event) {
     this.shopParams.pageNumber = event
     this.getProducts();
  }
  }


  onSearch() {
       this.shopParams.search = this.searchTerm.nativeElement.value;
       this.shopParams.pageNumber = 1
       this.getProducts();
  }


  onRest() {

    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts()

  }





}
