import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedInUserData: any;
  navBarCollapsed: boolean;
  @Output() headerOutputEvents = new EventEmitter();
  constructor(private commonService: CommonService) {
    this.commonService.loginLogoutSubjectObservable.subscribe(res => {
      // console.log('isLogin = ', res);
      if (res) {
        this.getCheckLoggedInUser();
      }
    });
  }

  ngOnInit(): void {
    this.getCheckLoggedInUser();
    this.navBarCollapsed = true;
  }
  getCheckLoggedInUser() {
    if (this.commonService.getLocalStorageObj('loginUserData')) {
      this.loggedInUserData = this.commonService.getLocalStorageObj(
        'loginUserData'
      );
    }
  }
  navigateTo(page: string) {
    switch (page) {
      case 'login':
        // this.loginData = this.commonService.getLocalStorageObj('LoginUserData');

        this.headerOutputEvents.emit('login');
        break;
    }
  }
  logoutUser() {
    localStorage.clear();
    this.commonService.loginLogoutEvents(false);
    this.loggedInUserData = undefined;
  }
}
