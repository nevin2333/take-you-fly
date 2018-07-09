import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {TestRoute} from "../../routes/test.route";
import {TestComponent} from "../pages/test/test.component";
import {HttpHelper} from "../../helper/http.helper";
import {DynamicTestComponent} from "../pages/test/dynamic-section/dynamic-test.component";

@NgModule({
  declarations: [
    TestComponent,
    DynamicTestComponent,
  ],
  entryComponents: [DynamicTestComponent],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    TestRoute,
  ],
  providers: [HttpHelper],

})
export class SharedMaterialModule { }
