import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import * as moment from 'moment';

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
  @ViewChild('ChatElement', {static: false}) chatEle: ElementRef;
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
    if (this.chatbox !== '') {
      const param = {
        messageTxt: this.chatbox,
        uid : this.loggedInUser.uid,
        registration_token: this.loggedInUser.registration_token,
        dateTime: new Date()
      };
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

  }
  getOldMessages() {
    this.loadingMsgs = true;
    this.commonService.getAllMessages().on('value', res => {
      this.messageList = [];
      // console.log('response from all messages = ', res.val());
      res.forEach(element => {
        // console.log('element = ', element.val());
        // this.messageList.push(element.val());
        if (element.val().dateTime) {
        const date = element.val().dateTime;
        if (this.messageList.findIndex(item => moment(item.dateTime).format('DD.MM.YYYY').includes(moment(date).format('DD.MM.YYYY'))) === -1) {
          this.messageList.push({
           sender:  element.val().sender,
           text:  element.val().text,
           dateTime:  element.val().dateTime,
           dateSepration:  element.val().dateTime
          });
        } else {
          this.messageList.push(element.val());
        }
        // console.log(' this.messageList = ', this.messageList);
      }
      });
      this.loadingMsgs = false;
      setTimeout(() => {
      this.chatEle.nativeElement.scrollTop =  this.chatEle.nativeElement.scrollHeight;
      });
    }, error => {
      this.loadingMsgs = false;
    });
  }
}
