import { Component, OnInit } from '@angular/core';
import { BasketService } from './../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotsls } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$: Observable<IBasketTotsls>

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {

    this.basketTotal$ = this.basketService.basketTotal$;
  }

}
