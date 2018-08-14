import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DynamicTestComponent} from "./dynamic-section/dynamic-test.component";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [ './test.component.css' ]
})
export class TestComponent implements OnInit {

  title1
  title2
  title3
  content1
  content2
  content3
  content = 1

  @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef

  constructor(private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  addComponent(){
    let com = this.cfr.resolveComponentFactory(DynamicTestComponent)
    let componentRef = this.dmRoom.createComponent(com)
    componentRef.instance.asd = '123321'
  }

  ngAfterViewChecked(){
    this.title1 = document.getElementById('title1');
    this.title2 = document.getElementById('title2');
    this.title3 = document.getElementById('title3');
    this.content1 = document.getElementById('content1');
    this.content2 = document.getElementById('content2');
    this.content3 = document.getElementById('content3');
    this.content = 1
    window.addEventListener('scroll', this.scrollHandler);
  }

  scrollHandler(e){


    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let articleHeight = document.getElementById('article1').clientHeight;

    if (scrollTop > 0 && scrollTop < articleHeight){
      this.title1.classList.add('title-anim', 'animated', 'delay-2s', 'bounceInUp');
      this.content1.classList.add('content-anim');
    }else if (scrollTop >= articleHeight && scrollTop < articleHeight * 2){
      this.title2.classList.add('title-anim', 'animated', 'delay-2s', 'bounceInUp');
      this.content2.classList.add('content-anim');
    }else if (scrollTop >= articleHeight * 2 && scrollTop < articleHeight * 3){
      this.title3.classList.add('title-anim2', 'animated', 'delay-2s', 'bounceInUp');
      this.content3.classList.add('content-anim');
    }
  }

}
