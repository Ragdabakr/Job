import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-homebage',
  templateUrl: './homebage.component.html',
  styleUrls: ['./homebage.component.scss']
})
export class HomebageComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  getAllusers() {
    this.homeService.getAllemployees().subscribe((data)=>{
      
    })
  }

}
