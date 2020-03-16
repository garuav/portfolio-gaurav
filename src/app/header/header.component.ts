import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() headerOutputEvents = new EventEmitter();
  loginData;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
  navigateTo(page: string) {
    switch (page) {
      case 'login':
        this.loginData = this.commonService.getLocalStorageObj('LoginUserData');

        this.headerOutputEvents.emit('login');
        break;
    }
  }
}
