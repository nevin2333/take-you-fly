import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../app/pages/login/login.component";
import {DashboardComponent} from "../app/pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: 'dashboard', loadChildren: '../modules/dashboard.module#DashboardModule'},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 首页链接重定向
  { path: 'cms', loadChildren: '../modules/cms.module#CmsModule'},
  { path: 'login', component: LoginComponent}
]

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {

}
