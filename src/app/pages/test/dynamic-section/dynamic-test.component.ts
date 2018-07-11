import {OnInit} from "@angular/core";
import {Component, ViewChild} from "@angular/core";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";

@Component({
  templateUrl: './dynamic-test.component.html',
  styleUrls: ['./dynamic-test.component.css']
})

export class DynamicTestComponent implements OnInit{
  asd: any;
  is_edit: boolean = false;
  @ViewChild('overlays') _overlay: CdkOverlayOrigin

  _positions = [];

  constructor(){}

  get overlay() {
    return {elementRef: this._overlay}
  }

  ngOnInit(){
    let temp = {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    }
    this._positions.push(temp)
  }

  displayMenu() {
    this.is_edit = !this.is_edit
    console.log(this.is_edit)
  }
}
