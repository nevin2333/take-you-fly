import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {TestRoute} from "../../routes/test.route";
import {TestComponent} from "../pages/test/test.component";
import {HttpHelper} from "../../helper/http.helper";
import {DynamicTestComponent} from "../pages/test/dynamic-section/dynamic-test.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatNativeDateModule, MatNavList,
  MatSidenavModule
} from "@angular/material";
import {CommonModule} from "@angular/common";

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
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatListModule,
    CommonModule,
    OverlayModule,
  ],
  providers: [HttpHelper],
  exports: [OverlayModule],

})
export class SharedMaterialModule { }
