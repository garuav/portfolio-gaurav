import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  loggedInUser;
  chatbox: string;
  disableSendButton: boolean;
  messageList: any [];
  loadingMsgs: boolean;
  constructor(private commonService: CommonService) {
    this.disableSendButton = false;
  }

  ngOnInit(): void {
    this.messageList = [];
    this.loggedInUser = this.commonService.getLocalStorageObj('loginUserData');
    this.loadingMsgs = true;
    this.getOldMessages();
  }
  sendMessage() {
    const param = {
      messageTxt: this.chatbox,
      uid : this.loggedInUser.uid,
      registration_token: this.loggedInUser.registration_token,
      dateTime: new Date()
    }
    console.log(' param = ',  param);
    this.disableSendButton = true;
    this.commonService.sendNotification('chat', param).subscribe(res => {
      console.log('message send = ', res);
      this.disableSendButton = false;
      const obj = {
          sender: 'user',
          text: this.chatbox,
          dateTime: new Date()
      };
      this.commonService.saveChatMessages(obj).then(response => {
        console.log('response from save chat message = ', response);
      }).catch(error => {
        console.log('error = ', error);
      });
      this.chatbox = '';
    }, error => {
      this.disableSendButton = false;
      console.log('error  = ', error);
    });

  }
  getOldMessages() {
    this.loadingMsgs = true;
    this.commonService.getAllMessages().on('value', res => {
      this.messageList = [];
      console.log('response from all messages = ', res.val());
      res.forEach(element => {
        console.log('element = ', element.val());
        this.messageList.push(element.val())
      })
      this.loadingMsgs = false;
    }, error => {
      this.loadingMsgs = false;
    });
   
  }
}
