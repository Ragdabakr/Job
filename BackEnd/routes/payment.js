const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const { authMiddleware } = require('../helpers/auth');
const async = require('async');
const paypal = require('paypal-rest-sdk');
const url = require('url');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZOZt6ulxGYmRM6JYJ8F_vquvM5likoqxjPU3Csvd0h-inIRUZGLimRI3BhVn4akQj-YnV5pBOfVFPpk',
  'client_secret': 'EG3GnDqvE2lM-GyJodXID1NvXl7LToQs1MK9IbNnVBirdwUF3Bo2cRa88KaUeus4wX-NPJWlkf8fFWzB'
});


//For billing agreement between the buyer and paypal.
router.get('/createagreement/:planId', function(req, res){
  //when plan start
  var billingPlan = req.params.planId;
    var d = new Date(Date.now() + 1*60*1000);
    d.setSeconds(d.getSeconds() + 4);
    var isDate = d.toISOString();
    var isoDate = isDate.slice(0, 19) + 'Z';

    var billingPlanAttributes = {
        "description": "Clearly Next Subscription.",
        "merchant_preferences": {
            "auto_bill_amount": "yes",
            "cancel_url": "http://localhost:4200/cancel",
            "initial_fail_amount_action": "continue",
            "max_fail_attempts": "2",
            "return_url": "http://localhost:4200/order",
            "setup_fee": {
                "currency": "USD",
                "value": "25"
            }
        },
        "name": "Testing1-Regular1",
        "payment_definitions": [
            {
                "amount": {
                    "currency": "USD",
                    "value": "100"
                },
                "charge_models": [
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "10.60"
                        },
                        "type": "SHIPPING"
                    },
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "20"
                        },
                        "type": "TAX"
                    }
                ],
                "cycles": "0",
                "frequency": "MONTH",
                "frequency_interval": "1",
                "name": "Regular 1",
                "type": "REGULAR"
            },
            {
                "amount": {
                    "currency": "USD",
                    "value": "20"
                },
                "charge_models": [
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "10.60"
                        },
                        "type": "SHIPPING"
                    },
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "20"
                        },
                        "type": "TAX"
                    }
                ],
                "cycles": "4",
                "frequency": "MONTH",
                "frequency_interval": "1",
                "name": "Trial 1",
                "type": "TRIAL"
            }
        ],
        "type": "INFINITE"
    };

    var billingPlanUpdateAttributes = [
        {
            "op": "replace",
            "path": "/",
            "value": {
                "state": "ACTIVE"
            }
        }
    ];

    var billingAgreementAttributes = {
        "name": "comapny plan",
        "description": "5 list company for one month in search Membership",
        "start_date": isoDate,
        "plan": {
            "id": billingPlan,
        },
        "payer": {
            "payment_method": "paypal"
        },
    };

// Create the billing plan
paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
  if (error) {
      console.log(error);
      throw error;
  } else {
      console.log("Create Billing Plan Response");
      console.log(billingPlan);

      // Activate the plan by changing status to Active
      paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
          if (error) {
              console.log(error);
              throw error;
          } else {
              console.log("Billing Plan state changed to " + billingPlan.state);
              billingAgreementAttributes.plan.id = billingPlan.id;

              // Use activated billing plan to create agreement
              paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    console.log("Create Billing Agreement Response");
                    //console.log(billingAgreement);
                    for (var index = 0; index < billingAgreement.links.length; index++) {
                        if (billingAgreement.links[index].rel === 'approval_url') {
                            var approval_url = billingAgreement.links[index].href;
                            console.log("For approving subscription via Paypal, first redirect user to");
                            console.log(approval_url);
                            // res.redirect(approval_url);
                            res.json(approval_url);
                            console.log("Payment token is");
                            console.log(url.parse(approval_url, true).query.token);
                        }
                    }
                }
            });
          }
      });
  }
  });
});

router.get('/processAgreement', authMiddleware ,function(req,res){
    var token = req.query.token;
    var user = res.locals.user;
    console.log(token,'tokentoken');
    paypal.billingAgreement.execute(token, {}, function (error, billingAgreement) {
        if (error) {
            console.error(error);
            throw error;
        } else {
            User.findByIdAndUpdate(user.id, { isCompanyPlan: true})
                .exec()
                .then(user => {
                    console.log("isPayment success");
                    console.log(JSON.stringify(billingAgreement));
                    res.send({message:'Billing Agreement Created Successfully',data:JSON.stringify(billingAgreement)});
                    res.json(user);
                })
                .catch(error =>console.log(error) );   
        }
    });
});


module.exports = router;


