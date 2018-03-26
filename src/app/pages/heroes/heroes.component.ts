import { Component, OnInit } from '@angular/core';
import {Hero} from "../../../model/common/hero";
import {HeroesService} from "../../services/heroes/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(public heroService: HeroesService) { }

  ngOnInit() {
    this.heroService.get_heroes().subscribe( data => {
      this.heroes = data.heroes
    })
  }

}
