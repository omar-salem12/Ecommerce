import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component:HomeComponent,data:{breadcrumb: 'Home'}},
  {path:'shop', loadChildren:() => import('./shop/shop.module').then(m => m.ShopModule),
  data:{breadcrumb:{label:'shop'}}},

  {path:'basket', loadChildren:() => import('./basket/basket.module').then(m => m.BasketModule),
    data:{breadcrumb:{label:'basket'}}},

    {path:'checkout', loadChildren:() => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    data:{breadcrumb:{label:'checkout'}}},

  {path: 'test-error', component:TestErrorComponent,data:{breadcrumb:'Test Errors'}},
  {path:'server-error', component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:'not-found',component:NotFoundComponent, data:{breadcrumb:'Not Found'}},
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],



exports: [RouterModule]
})
export class AppRoutingModule { }
