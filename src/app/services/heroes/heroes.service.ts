import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";
import {Hero} from "../../../model/common/hero";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class HeroesService {

  heroes: Hero[]

  constructor(public http: HttpHelper) { }

  public get_heroes(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/heroes.json', search_params)
  }

  public updateHero(hero: Hero): Observable<any> {
    let update_params = {
      name: hero.name
    }
    return this.http.AUTH_HTTP_PUT('api/heroes/' + hero.id + '.json', update_params)
  }

}
