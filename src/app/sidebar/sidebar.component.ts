import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // tslint:disable-next-line:no-output-rename
  @Output() sidebarOutputEvents = new EventEmitter();
  loginData;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
  navigateTo(page: string) {
    switch (page) {
      case 'login':
        this.loginData = this.commonService.getLocalStorageObj('LoginUserData');

        this.sidebarOutputEvents.emit('login');
        break;
    }
  }
}
