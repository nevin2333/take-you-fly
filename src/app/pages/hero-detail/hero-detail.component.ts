import { Component, OnInit, Input } from '@angular/core';
import {Hero} from "../../../model/common/hero";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroesService} from "../../services/heroes/heroes.service";
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes, group
} from '@angular/animations';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: 'red',
        width: '10px'
      })),
      state('active',   style({
        backgroundColor: 'blue',
        width: '120px'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  state = 'active'

  sa = true;

  birthday = new Date(1988, 3, 15);

  constructor(private route: ActivatedRoute,
              private heroService: HeroesService,
              private location: Location) { }

  ngOnInit() {
    console.log(this.hero)
    this.getHero()
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    if (id){
      let hero_search = {
        'search[id]': id
      }
      this.heroService.get_heroes(hero_search).subscribe( data => {
        this.hero = data.data.heroes[0]
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe( data => {
        this.goBack()
    })
  }

  sad(){
    this.sa = !this.sa
    console.log(this.sa)
  }

  toggleState(){
    this.state = this.state === 'active' ? 'inactive' : 'active';
    console.log(this.state)
  }

}
