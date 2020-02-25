import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  isLoginData: any;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.isLoginData = this.commonService.getLocalStorageObj('LoginUserData');
  }
}
