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

  hero: Hero;

  asd = true;

  POSITION_MAP = /** @type {?} */ (({
    'top': {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    },
    'right': {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    },
    'bottom': {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
    'left': {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
  }));

  DEFAULT_4_POSITIONS = this._objectValues([this.POSITION_MAP["top"], this.POSITION_MAP["right"], this.POSITION_MAP["bottom"], this.POSITION_MAP["left"]]);

  test_content = {
    'a': 1,
    'b': 2,
  }

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.DEFAULT_4_POSITIONS)
    console.log(this.test_content)
  }

  getHeroes(): void {
    this.heroService.get_heroes().subscribe(data => {
        this.heroes = data.data.heroes.slice(1, 5);
        this.hero = this.heroes[0];
      });
  }

  /**
   * @template T, S
   * @param {?} array
   * @param {?} iteratee
   * @return {?}
   */
  arrayMap(array, iteratee) {
    let /** @type {?} */ index = -1;
    const /** @type {?} */ length = array == null ? 0 : array.length;
    const /** @type {?} */ result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  /**
   * @template T
   * @param {?} object
   * @param {?} props
   * @return {?}
   */
  baseValues(object, props) {
    return this.arrayMap(props, (key) => {
      return object[key];
    });
  }
  /**
   * @template T
   * @param {?} object
   * @return {?}
   */
  _objectValues(object) {
    console.log(123)
    return object == null ? [] : this.baseValues(object, Object.keys(object));
  }

  // arrayMap<T, S>(array: T[], iteratee: (item: T, index: number, arr: T[]) => S): S[] {
  //   let index = -1;
  //   const length = array == null ? 0 : array.length;
  //   const result = Array(length);
  //
  //   while (++index < length) {
  //     result[ index ] = iteratee(array[ index ], index, array);
  //   }
  //   return result;
  // }
  //
  // baseValues<T>(object: { [key: string]: T } | T[], props: string[]): T[] {
  //   return this.arrayMap(props,  (key) => {
  //     return object[ key ];
  //   });
  // }
  //
  // _objectValues<T>(object: { [key: string]: T } | T[]): T[] {
  //   return object == null ? [] : this.baseValues(object, Object.keys(object));
  // }

}
