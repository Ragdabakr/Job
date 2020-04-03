import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userId: any;
  user: any;
  chatLists: any;
  msg: any;
  checkarr: number = 0;
  reciever: any;
  sender: any;
  findMsgId: any;
  socket: any;

  constructor(private auth: AuthService ,
              private messageService: MessageService,
              private router: Router ){this.socket = io('http://localhost:3000')}

  ngOnInit() {
    this.getUserProfile();
    this.socket.on('refreshPage', () => {
      this.getUserProfile();
    });
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
    this.chatLists = user.chatList;
    this.checkIfMessageRead(this.chatLists);
    });

  }
  TimeFromNow(time) {
    return moment(time).fromNow();
  }
  checkIfMessageRead(arr) {
    for(let i = 0 ; i< arr.length ; i++ ){
    this.findMsgId =  arr[i].msg.messages[arr[i].msg.messages.length-1]._id; 
    this.msg = arr[i].msg.messages[arr[i].msg.messages.length-1].isRead;
    this.reciever = arr[i].msg.messages[arr[i].msg.messages.length-1].reciever;
    this.sender = arr[i].msg.messages[arr[i].msg.messages.length-1].sender;
    if (this.router.url === `/dashboard/message/${this.sender}` ) {
      if (this.msg === false && this.reciever === this.user.profile.firstName ) {
        this.msg = true;
        this.checkarr -= 1;
        this.socket.emit('refresh', {});
        this.messageService.removeIsRead(this.findMsgId).subscribe((data) => {
      });
        this.socket.emit('refresh', {});
      }
    }
    if (this.msg === false && this.sender !== this.user.profile.firstName  ) {
      this.checkarr += 1;
    }

    }
  }
  getchatPage() {
    setTimeout(() => {
      window.location.href = `/dashboard/message`;
     }, 1000);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
