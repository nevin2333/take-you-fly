import { Component } from '@angular/core';


@Component({
  selector: 'custom-popup',
  templateUrl: './popup.component.html',
})

export class PopupComponent {

}

class MyCustomElement extends HTMLElement {
  constructor() {
    super();

    var img = document.createElement('img');
    img.src = 'http://atyun-api-sit.oss-cn-shanghai.aliyuncs.com/uploads/image/file/18864/b9f3c2e1-97f6-4811-9317-f92ca22f1396.jpg'
    // img.width = '200px'
    // img.height = '200px'
    img.setAttribute("style","width: 100px; height: 100px;");
    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(img.cloneNode(true));
  }
}

// customElements.define('element-details' ,MyCustomElement)
