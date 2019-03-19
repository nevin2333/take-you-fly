import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {BrandsService} from "../app/services/operate/brands.service";
import {HttpHelper} from "../helper/http.helper";
import {CmsRoute} from "../routes/cms.route";
import {UserService} from "../app/services/operate/user.service";

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    CmsRoute
  ],
  providers: [HttpHelper, BrandsService, UserService]
})
export class CmsModule { }
