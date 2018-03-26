import { Component, OnInit } from '@angular/core';
import { Hero} from "../../../model/common/hero";
import { HeroesService } from "../../services/heroes/heroes.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.get_heroes().subscribe(data => {
        this.heroes = data.heroes.slice(1, 5)
      });
  }
}
