import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import * as firebase from 'firebase/app';
import { firebaseInit, pushCertificateKey } from '../common.constants';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './route-animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './services/common.service';
import { LoginComponent } from './login/login.component';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit, AfterViewInit {
  loginData: any;
  tabsData;
  projectViewModalRef;
  showChatComponent: boolean;
  showChatMessageDiv = true;
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private swPush: SwPush
  ) {
    this.commonService.loginLogoutSubjectObservable.subscribe(res => {
      console.log('isLogin = ', res);
      if (!res) {
       this.showChatComponent = false;
       this.swPush.unsubscribe().then(response => {
         console.log('unsubscribing notifications = ', response);
       }).catch(error => {
        console.log('error notifications = ', error);

       });
      } else {
         this.commonService.onTokenRefresh();
         this.commonService.getMobileToken();
         this.swPush.requestSubscription({serverPublicKey: pushCertificateKey}).then(response => {
          console.log('response from requestSubscription  = ', response);
        }).catch(error => {
          console.log('from requestSubscription  = ', error);
        });
      }
    });
  }
  ngOnInit() {
    this.initFirebase();
    if (window.location.href.includes('gauravgithub')) {
      setTimeout(() => {
        this.commonService.saveDataToUsersCollection('visits').then(response => {
          console.log('saved user to collections = ', response);
        }).catch(error => {
          console.log('error  collections = ', error);
        });
      }, 2000);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
     const element =  document.getElementById('loader-main');
     element.style.display = 'none';
     this.commonService.registerServiceWorker();
     if (this.commonService.getLocalStorageObj('loginUserData')) {
      this.commonService.getRegistrationToken();
      this.commonService.getMobileToken();
     }
    }, 500);
  }
 async initFirebase() {
    firebase.initializeApp(firebaseInit);
    await this.swPush.requestSubscription({serverPublicKey: pushCertificateKey}).then(res => {
      console.log('response from requestSubscription  = ', res);
    }).catch(error => {
      console.log('from requestSubscription  = ', error);
    });
    await this.swPush.messages.subscribe((res) => {
      console.log('on Notification = ', res);
    }, error => {
      console.log('on Notification error = ', error);
    });
    await this.swPush.notificationClicks.subscribe(response => {
      console.log('on notification click = ', response);
      if (this.commonService.getLocalStorageObj('loginUserData')) {
        this.showChatComponent = true;
      }
    }, error => {
      console.log('on notification click erro = ', error);

    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation && outlet.activatedRoute
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
