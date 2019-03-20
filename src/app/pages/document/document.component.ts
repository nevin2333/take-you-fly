import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {DocumentService} from "../../services/operate/document.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
})
export class DocumentComponent implements OnInit {

  constructor(private document_service: DocumentService,
              private global_service: GlobalService
  ) { }

  documents = []
  total_count

  ngOnInit() {
    this.loadProductLabel();
  }

  loadProductLabel(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }

    this.document_service.documents(search_params).subscribe(data => {
      if (data) {
        this.documents = data.models || []
        this.total_count = data.total_count
      }
    })
  }

}
