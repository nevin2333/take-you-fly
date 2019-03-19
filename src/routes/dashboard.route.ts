import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../app/pages/dashboard/dashboard.component";
import {CmsAccountInterceptor} from "../interceptor/cms_login.interceptor";
import {ShopComponent} from "../app/pages/shop/shop.component";
import {BrandComponent} from "../app/pages/brand/brand.component";
import {DocumentComponent} from "../app/pages/document/document.component";
import {ProductComponent} from "../app/pages/product/product.component";
import {ProductCategoryComponent} from "../app/pages/product_category/product-category.component";
import {ProductLabelComponent} from "../app/pages/product_label/product-label.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [CmsAccountInterceptor],
    children: [
      { path: 'shop', component: ShopComponent},
      { path: 'brand', component: BrandComponent},
      { path: 'document', component: DocumentComponent},
      { path: 'product', component: ProductComponent},
      { path: 'product_category', component: ProductCategoryComponent},
      { path: 'product_label', component: ProductLabelComponent},
    ]
  }
]

export const DashboardRoute = RouterModule.forChild(routes)
