import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { HomebageComponent } from './homebage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaypalSubscriptionDirective } from './paypal-subscription.directive';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    PricingPlansComponent,
    HomebageComponent ,
    CheckoutComponent ,
    InvoiceComponent,
    PaypalSubscriptionDirective,
    OrderComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomebageModule { }
