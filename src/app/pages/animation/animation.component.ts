import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
})
export class AnimationComponent implements OnInit {
  clicked = false;
  transform = false;
  move = false;

  constructor(){

  }

  ngOnInit(){

  }
}
