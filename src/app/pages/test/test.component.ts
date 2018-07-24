import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AfterViewInit} from "@angular/core";
import {DynamicTestComponent} from "./dynamic-section/dynamic-test.component";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

  @ViewChild('dmroom', {read: ViewContainerRef}) dmRoom: ViewContainerRef

  constructor(private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.addComponent();
  }

  addComponent(){
    let com = this.cfr.resolveComponentFactory(DynamicTestComponent)
    let componentRef = this.dmRoom.createComponent(com)
    componentRef.instance.asd = '123321'
  }

}
