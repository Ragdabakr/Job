import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from '../message.service';
import io from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userId: any;
  userChatList = [];
  conversationList = [];
  recieverId: any;
  senderName: any;
  recieverName: any;
  chat = [];
  List: any;
  socket: any;
  message: any;
  body: any;
  typingMessage;
  typing: boolean = false;
  findMsgId: any;
  chatListId: any;
  user: any;
  recieverUser: any;

  constructor(private auth: AuthService ,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) {this.socket = io('http://localhost:3000')}

  ngOnInit() {
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getChatList(this.recieverId , this.recieverName);
    });
    this.socket.on('is_typing', data => {
      if (data.sender === this.recieverName) {
         this.typing = true;
      }
    });
    this.socket.on('stop_typing_data', data => {
      if (data.sender === this.recieverName) {
         this.typing = false;
      }
    });
}

  getUser() {
    this.userId = this.auth.getUserId();
    this.auth.getUserById(this.userId).subscribe((data) => {
    this.user = data;
    this.conversationList  = data.chatList;
    this.senderName = data.profile.firstName;
    });
  }
  getChatList(recieverId , recieverName) {
    this.joinChat();
    this.auth.getUserById(recieverId).subscribe((data) => {
      this.recieverUser = data.profile;
      });
    this.recieverId = recieverId;
    this.recieverName = recieverName;
    this.messageService.getAllMessages(this.userId, this.recieverId).subscribe((data) => {
    this.chat = data.messages;
    // this.socket.emit('refresh', {});
    this.location.replaceState(`/dashboard/message/${this.recieverName}`);
     });
  }

  joinChat() {
    const params = {
      room1: this.senderName ,
      room2: this.recieverName
    };
    this.socket.emit('join chat', params);
  }
  sendMessage(body) {
    this.messageService.sendMessage( body.value, this.userId , this.recieverId, this.senderName , this.recieverName).subscribe((data) =>{
    });
    this.socket.emit('refresh', {});
    body.value = '';
    }
    isTyping() {
      this.socket.emit('start_typing', {
        sender: this.senderName,
        reciever : this.recieverName
      });
      if (this.typingMessage) {
        clearTimeout(this.typingMessage);
      }
      this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.senderName,
        reciever : this.recieverName
      });
    }, 500);
  }
  deleteConv( chatListId) {
    this.chatListId = chatListId;
    this.messageService.deleteConv(this.chatListId).subscribe((data) =>{
    });
    window.location.reload();
    }
}
