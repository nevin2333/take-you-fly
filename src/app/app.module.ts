import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpHelper} from "../helper/http.helper";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "../routes/app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from "./pages/login/login.component";
import {UserService} from "./services/operate/user.service";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {TokenInterceptor} from "../interceptor/token.interceptor";
import {ResponseInterceptor} from "../interceptor/response.interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [HttpHelper, UserService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
