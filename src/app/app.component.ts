import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  loginData: any;
  tabsData;
  projectViewModalRef;
  isPageLoading: boolean;
  showChatComponent: boolean;
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {
    
  }
  ngOnInit() {
    this.isPageLoading = true;
    this.initFirebase();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isPageLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }
  initFirebase() {
    firebase.initializeApp(firebaseInit);
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  headerOutputEvents(event) {
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
  projectViewEvents(event) {
    console.log('event = ', event);
  }
  chatPage() {
    this.loginData = this.commonService.getLocalStorageObj('loginUserData');
    if (this.loginData) {
      this.showChatComponent = !this.showChatComponent;
    } else {
      this.showChatComponent = false;
      const loginModalRef = this.modalService.open(LoginComponent);
      loginModalRef.result
          .then(res => {
            console.log('res = ', res);
            this.showChatComponent = true;
            // this.commonService.chatPageEvents(true);
          })
          .catch(err => {
            console.log('err = ', err);
          });
    }
  }
}
