import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import {HeroesService} from "./services/heroes/heroes.service";
import {HttpHelper} from "../helper/http.helper";
import {HttpModule} from "@angular/http";
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import {AppRoutingModule} from "../routes/app-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AnimationComponent} from "./pages/animation/animation.component";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    AnimationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [HeroesService, HttpHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
