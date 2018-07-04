import { Component, OnInit, Input } from '@angular/core';
import {Hero} from "../../../model/common/hero";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroesService} from "../../services/heroes/heroes.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroesService,
              private location: Location) { }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    let hero_search = {
      'search[id]': id
    }
    this.heroService.get_heroes(hero_search).subscribe( data => {
      this.hero = data.data.heroes[0]
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe( data => {
        this.goBack()
    })
  }

}
