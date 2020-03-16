import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
//   styleUrls: ['./some.component.css']
})
export class ModelComponent implements OnInit {

  title;
  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}