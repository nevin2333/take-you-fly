import {Injector, NgModule} from '@angular/core';
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
import {PopupComponent} from "../pages/popup/popup.component";
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [
    TestComponent,
    DynamicTestComponent,
    PopupComponent,
  ],
  entryComponents: [DynamicTestComponent, PopupComponent],
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
export class SharedMaterialModule {
  constructor(private injector: Injector){
    const customPopup = createCustomElement(PopupComponent, { injector });
    customElements.define('custom-popup', customPopup);
  }
}
