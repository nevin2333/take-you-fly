import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {HttpHelper} from "../helper/http.helper";
import {DashboardComponent} from "../app/pages/dashboard/dashboard.component";
import {DashboardRoute} from "../routes/dashboard.route";
import {CmsAccountInterceptor} from "../interceptor/cms_login.interceptor";
import {DataHelper} from "../helper/data.helper";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ShopComponent} from "../app/pages/shop/shop.component";
import {BrandComponent} from "../app/pages/brand/brand.component";
import {DocumentComponent} from "../app/pages/document/document.component";
import {ProductComponent} from "../app/pages/product/product.component";
import {ProductCategoryComponent} from "../app/pages/product_category/product-category.component";
import {ProductLabelComponent} from "../app/pages/product_label/product-label.component";
import {BrandsService} from "../app/services/operate/brands.service";
import {GlobalService} from "../app/services/global.service";
import {CommonModule} from "@angular/common";
import {ShopService} from "../app/services/operate/shop.service";
import {ProductLabelService} from "../app/services/operate/product-label.service";
import {DocumentService} from "../app/services/operate/document.service";
import {ProductService} from "../app/services/operate/product.service";
import {ProductCategoryService} from "../app/services/operate/product-category.service";
import {httpInterceptorProviders} from "../app/app.module";
import {AtUploadModule} from "../app/upload";
import {ProductAttributeService} from "../app/services/operate/product-attribute.service";
import {ProductAttributeValueService} from "../app/services/operate/product-attribute-value.service";

@NgModule({
  declarations: [
    DashboardComponent,
    ShopComponent,
    BrandComponent,
    DocumentComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DashboardRoute,
    NgZorroAntdModule,
    AtUploadModule
  ],
  providers: [HttpHelper, httpInterceptorProviders, CmsAccountInterceptor, DataHelper, BrandsService,
    GlobalService, ShopService, ProductLabelService,
    DocumentService, ProductService, ProductCategoryService, ProductAttributeService, ProductAttributeValueService
  ]
})
export class DashboardModule { }
