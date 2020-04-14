import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomebageComponent } from '../homebage.component';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  planId: string;
  plan: any;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
    ) { }

  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('planId');
    this.homeService.getPlan(this.planId).subscribe((data) => {
      this.plan = data;
      console.log(this.plan);
  });
}
  getCompanyPlan(planId){
    this.homeService.getPaypalPlan(planId).subscribe((data) => {
      const redirectUrl = data;
      console.log('redirectUrl', data);
      setTimeout(() => {
        window.location.href = `${redirectUrl}`;
       }, 1000);
  },
  (err) => {
    console.log(err);
  });
  }
}
