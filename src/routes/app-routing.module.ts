import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HeroesComponent} from "../app/pages/heroes/heroes.component";
import {DashboardComponent} from "../app/pages/dashboard/dashboard.component";
import {HeroDetailComponent} from "../app/pages/hero-detail/hero-detail.component";

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 首页链接重定向
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'test', loadChildren: '../app/module/shared-material.module#SharedMaterialModule'},
]

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {

}
