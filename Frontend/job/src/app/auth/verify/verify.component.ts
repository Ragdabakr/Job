import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginPage(){
    this.router.navigate(['/login']);
  }

}
