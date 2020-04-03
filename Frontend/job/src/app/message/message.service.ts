
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService  {

  constructor(private http: HttpClient) { }

public getCountries(): Observable<any> {
  return this.http.get('/api/v1/lookup/countries');
}
public getAllMessages(senderId , recieverId): Observable<any> {
  return this.http.get(`/api/v1/message/chatMsg/${senderId}/${recieverId}`);
}
public sendMessage(body: any  , senderId , reciverId , senderName, reciverName ): Observable<any> { 
  return this.http.post('/api/v1/message/send-chat-message' , {body  , senderId , reciverId , senderName , reciverName});
}
public removeIsRead( msgId ): Observable<any> {
  return this.http.post('/api/v1/message/remove-isread' , { msgId});
}
public deleteConv( chatListId): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger; 
  return this.http.post('/api/v1/message/remove-conversation' , {  chatListId });
}

}