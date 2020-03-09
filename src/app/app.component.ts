import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseInit } from '../common.constants';
import { RouterOutlet } from '@angular/router';
import { fade } from './route-animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './services/common.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  loginData: any;

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.initFirebase();
  }
  initFirebase() {
    firebase.initializeApp(firebaseInit);
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  sidebarOutputEvents(event) {
    console.log('event = ', event);
    if (event && event === 'login') {
      this.loginData = this.commonService.getLocalStorageObj('loginUserData');
      console.log('this.loginData', this.loginData);
      if (this.loginData) {
      } else {
        console.log('else block = ', this.loginData);

        const loginModalRef = this.modalService.open(LoginComponent);
        loginModalRef.result
          .then(res => {
            console.log('res = ', res);
          })
          .catch(err => {
            console.log('err = ', err);
          });
        // loginModalRef.close(res => {
        //   console.log('res = ', res);
        // });
      }
    }
  }
}
