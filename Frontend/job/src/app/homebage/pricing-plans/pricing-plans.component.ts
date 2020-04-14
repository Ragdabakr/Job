import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.scss']
})
export class PricingPlansComponent implements OnInit {
   plans = [];
   PlanItems = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getPlans();
  }


  getCompanyCheckout(plan) {
    const planId = plan._id;
    setTimeout(() => {
      window.location.href = `checkout/${planId}`;
     }, 1000);
 }
 getPlans(){
   this.homeService.getPlans().subscribe((data) => {
     this.plans = data;
     this.PlanItems = this.plans[0].PlanItems;
     console.log('plans', this.PlanItems);
   });
 }
  
}
