module.exports = function(io){
    io.on("connection" ,function(socket){
        // console.log("User connected");
        socket.on('join chat', (params) => {
            // console.log("params",params);
            socket.join(params.room1);
            socket.join(params.room2);
        });
        socket.on('start_typing', data => {
            // console.log("data22",data);
            io.to(data.reciever).emit('is_typing' , data);
        });
        socket.on('stop_typing', data => {
            // console.log("data22",data);
            io.to(data.reciever).emit('stop_typing_data' , data);
        });
    });
};



// router.get('/createagreement/:companyPlanId', function(req, res){
//     //when plan start
//     var billingPlan = req.params.companyPlanId;
//     var userEmail = 'ragdabakr@yahoo.com';
//     console.log('plingplan',billingPlan);
//     var isoDate = new Date();
//     isoDate.setSeconds(isoDate.getSeconds() + 4);
//     isoDate.toISOString().slice(0, 19) + 'Z';
//     var billingAgreementAttributes = {
//     "name": "comapny plan",
//     "description": "5 list company for one month in search Membership",
//     "start_date": isoDate,
//     "plan": {
//     "id": billingPlan
//     },
//     "payer": {
//       "payment_method": "paypal",
//       // "payer_info": {
//       //   "email": "userEmail"
//       // },
//     },  
 
//     };
//     // Use activated billing plan to create agreement
//     paypal.billingAgreement.create(billingAgreementAttributes, function (error,
//    billingAgreement){
//     if (error) {
//     console.error(error);
//     throw error;
//     } else {
//     //capture HATEOAS links
//     var links = {};
//     billingAgreement.links.forEach(function(linkObj){
//     links[linkObj.rel] = {
//     'href': linkObj.href,
//     'method': linkObj.method
//     };
//     })
//     //if redirect url present, redirect user
//     if (links.hasOwnProperty('approval_url')){
//     res.redirect(links['approval_url'].href);
//     } else {
//     console.error('no redirect URI present');
//     }
//     }
//     });
//    });