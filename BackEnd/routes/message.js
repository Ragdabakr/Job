const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const { authMiddleware } = require('../helpers/auth');
const async = require('async');

// ---------------- Create Message ---------------- 


router.post("/send-message" ,authMiddleware ,function(req,res){
    const user = res.locals.user;
    const recieverId = req.body.reciverId;
    const senderId = req.body.senderId;
    const message = req.body.messageForm.message;
    const reciverName = req.body.reciverName;
    const senderName = req.body.senderName;
    const imageVersionR = req.body.imageVersion;
    const imageIdR = req.body.imageId;
    const imageVersionS = req.body.imageVersionSender;
    const imageIdS = req.body.imageIdSender;
 
    //check if there is previous conversation or not 

    Conversation.find({ $or:[
         {'senderId':senderId,'recieverId':recieverId },
         {'senderId':recieverId,'recieverId':senderId },
        ]},async function(err,conversation){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          // console.log('conversation',conversation);

          if(conversation.length > 0){

            // console.log('conversation',conversation[0].id);
             const conv = conversation[0].id;

           Message.findOne({conversation:conv},async function(err,foundMessage){
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                  }
                // console.log('foundMessage1',foundMessage); 
                await foundMessage.messages.push({
                    sender : senderName,
                    reciever : reciverName,   
                    senderId : senderId,
                    recieverId : recieverId,
                    isRead:false,
                    body : message,
                    created : Date.now(),
                 });
                 foundMessage.save();
                //  console.log('foundMessage2',foundMessage);
               });

          }else{

         const newConversation = new Conversation();
         newConversation.senderId = senderId;
         newConversation.recieverId = recieverId;
         newConversation.save();
        
        //  console.log('newConversation',newConversation);
      
        const newMessage = new Message();
        newMessage.conversation = newConversation._id;
        newMessage.sender = senderName;
        newMessage.reciever = reciverName;
        newMessage.messages.push({
           sender : senderName,
           reciever : reciverName,   
           senderId : senderId,
           recieverId : recieverId,
           isRead:false,
           body : message,
           created : Date.now(),
        });
        newMessage.save();

      //for reciever
      User.findOne({_id:recieverId}, async function(err,foundUser){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          await  foundUser.chatList.push({
                reciever:senderId,
                recieverName:senderName ,
                message:message,
                imageVersion:imageVersionS ,
                imageId:imageIdS,
                msg:newMessage._id
              });
          await  foundUser.conversationList.push(newMessage.id);    
          foundUser.save();
        });

        //for sender
        User.findOne({_id:senderId}, async function(err,foundUser){
          if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
           await foundUser.chatList.push({
               reciever:recieverId,
               recieverName:reciverName ,
               message:message,
               msg:newMessage._id,
               imageVersion:imageVersionR ,
               imageId:imageIdR,
              });
           await  foundUser.conversationList.push(newMessage.id);
            foundUser.save();
         });
         return res.json(newMessage);       
            }
      });
  });


// ---------------- Get all chat messages ---------------- 

 router.get("/chatMsg/:senderId/:recieverId",authMiddleware ,function(req,res){
    const user = res.locals.user;
    const recieverId = req.params.recieverId ;
    const senderId = req.params.senderId;
   

    Conversation.findOne({ $or:
        [
          {
           $and:[
               {'senderId':senderId},
              {'recieverId':recieverId },
           ]
        },
        {
           $and:[
              {'senderId':recieverId},
              {'recieverId':senderId },
            ]
         }
       ]
     }, function(err,conversation){
       if (err) {
           return res.status(422).send({errors: normalizeErrors(err.errors)});
         }
         
        
         if(conversation){
            const conv = conversation._id;
            Message.findOne({conversation:conv}, function(err,foundMessageConv){
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                  }
                  // console.log(foundMessageConv);
                  return res.json(foundMessageConv);
            });
         }
    });
 });

 // ---------------- Delete chat list  notification  when click on it---------------- 

router.post("/delete/:notifyId" ,authMiddleware , function(req,res){
  
  notifyId = req.params.notifyId;
  user = res.locals.user;
  const userId = user.id;
  User.findOne({_id:userId},async function(err,foundUser){
  if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    await foundUser.chatList.pull({
      _id:notifyId,
       });  
     foundUser.save();
    return res.json(foundUser);
    });
  });

// ---------------- Send chat Message ---------------- 


router.post("/send-chat-message" ,authMiddleware ,function(req,res){
    const user = res.locals.user;
    const recieverId = req.body.reciverId;
    const senderId = req.body.senderId;
    const message = req.body.body;
    const reciverName = req.body.reciverName;
    const senderName = req.body.senderName;
 
    //check if there is previous conversation or not 

    Conversation.find({ $or:[
         {'senderId':senderId,'recieverId':recieverId },
         {'senderId':recieverId,'recieverId':senderId },
        ]},async function(err,conversation){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          // console.log('conversation',conversation);

          if(conversation.length > 0){

            // console.log('conversation',conversation[0].id);
             const conv = conversation[0].id;

           Message.findOne({conversation:conv},async function(err,foundMessage){
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                  }
                // console.log('foundMessage1',foundMessage); 
                await foundMessage.messages.push({
                    sender : senderName,
                    reciever : reciverName,   
                    senderId : senderId,
                    recieverId : recieverId,
                    isRead:false,
                    body : message,
                    created : Date.now(),
                 });
                 foundMessage.save();
                //  console.log('foundMessage2',foundMessage);
               });

          }else{

         const newConversation = new Conversation();
         newConversation.senderId = senderId;
         newConversation.recieverId = recieverId;
         newConversation.save();
        
        //  console.log('newConversation',newConversation);
      
        const newMessage = new Message();
        newMessage.conversation = newConversation._id;
        newMessage.sender = senderName;
        newMessage.reciever = reciverName;
        newMessage.messages.push({
           sender : senderName,
           reciever : reciverName,   
           senderId : senderId,
           recieverId : recieverId,
           isRead:false,
           body : message,
           created : Date.now(),
        });
        newMessage.save();
        // console.log('newMessage',newMessage);
      

        //for sender
        User.findOne({_id:senderId}, async function(err,foundUser){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
             await  foundUser.chatList.push(
                 {reciever:recieverId,msg:newMessage._id});
             await  foundUser.conversationList.push(newMessage.id);

              foundUser.save();
            //   console.log('sender',foundUser);
           });

         //for reciever
        User.findOne({_id:recieverId}, async function(err,foundUser){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
              await  foundUser.chatList.push(
                 {reciever:senderId,msg:newMessage._id});
              await  foundUser.conversationList.push(newMessage.id);    
              foundUser.save();
            //   console.log('reciever',foundUser);
           });


          return res.json(newMessage);
        }
   
    });
  });
    // ---------------- Find delete-userBokkmark route---------------- 

router.post('/remove-isread', authMiddleware , function(req,res){
  const userId = res.locals.user.id; 
  const msgId = req.body.msgId;
  User.findById({_id : userId}).populate('chatList.msg').exec(function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
      const messageId = foundUser.conversationList;
      Message.findOne({_id:messageId}, function(err,foundMsge){
       if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
       }
       const foundMassege =  foundMsge.messages.filter(function(x) { return x.id === msgId; });
       foundMassege[0].isRead = true;
       foundMsge.save();
       return  res.json(foundMsge);
      });
      
   });

 });
 // ---------------- Find delete-conversation route---------------- 

 router.post('/remove-conversation', authMiddleware , function(req,res){
  const userId = res.locals.user.id; 
  const convId = req.body.convId;
  const recieverId = req.body.recieverId;
  console.log('recieverId',recieverId);
  User.findById({_id : userId}).populate('chatList.msg').exec(function(err,foundUser){
    if (err) {
        console.log(err);
        return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
       const chat = foundUser.chatList.filter(function(x) { return x.id !== convId; })
       foundUser.chatList = chat;
       foundUser.save();
       return  res.json(foundUser);
    });
 });


module.exports = router;


