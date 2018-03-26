import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpHelper} from "../../../helper/http.helper";
import {Hero} from "../../../model/common/hero";
import {URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class HeroesService {

  heroes: Hero[]

  constructor(public http: HttpHelper) { }

  public get_heroes(search_params = {}): Observable<any> {
    console.log(search_params)
    let params = new URLSearchParams()
    for (let key in search_params) {
      params.set(key, search_params[key])
    }
    return this.http.AUTH_HTTP_GET('api/heroes.json', params).map(data => this.http.extractData(data));
  }

  public updateHero(hero: Hero): Observable<any> {
    let update_params = {
      name: hero.name
    }
    return this.http.AUTH_HTTP_PUT('api/heroes/' + hero.id + '.json', update_params).map(data => this.http.extractData(data))
  }

}
