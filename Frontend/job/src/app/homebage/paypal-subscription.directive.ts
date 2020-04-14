
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
declare var paypal;
@Directive({
  selector: '[paypalSubscription]'
})
export class PaypalSubscriptionDirective implements AfterViewInit {
    @Input('paypalSubscription') planId: string;
    constructor( private el: ElementRef ) { }
    ngAfterViewInit(): void {
        console.log('planId', this.planId);
        paypal.Buttons({
            /* @see https://developer.paypal.com/docs/checkout/integration-features/customize-button/# */
            style: {
                layout:  'horizontal',
                color:   'blue',
                shape:   'pill',
                label:   'paypal'
            },
            createSubscription: (data, actions) => {
                console.log(data, actions);
                return actions.subscription.create({
                    plan_id: this.planId
                });
            },
            onApprove: (data, actions) => {
                console.log(data, actions);
                /** alert('You have successfully created subscription ' + data.subscriptionID); */
            }
        }).render(this.el.nativeElement);
    }
}