import {
  Component,
  OnInit,
  AfterViewInit
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
      if (!res) {
       this.showChatComponent = false;
       this.swPush.unsubscribe().then(response => {
       }).catch(error => {
        console.log('error notifications = ', error);

       });
      } else {
         this.commonService.onTokenRefresh();
         this.commonService.getMobileToken();
         this.swPush.requestSubscription({serverPublicKey: pushCertificateKey}).then(response => {
        }).catch(error => {
          console.log('from requestSubscription  = ', error);
        });
      }
    });
    this.commonService.chatPageCloseSubjectObservable.subscribe(() => {
      this.showChatComponent = false;
    });
  }
  ngOnInit() {
    this.initFirebase();
    if (window.location.href.includes('gauravgithub')) {
      setTimeout(() => {
        this.commonService.saveDataToUsersCollection('visits').then(response => {
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
     this.commonService.getMobileToken();
    }, 500);
  }
  // @HostListener('document:click', ['$event'])
  // click(event) {
  //     console.log('event = ', event);
  //     try {
  //         if (!event.target.className.includes('chat-page-icon') && !event.target.className.includes('intro-div') &&
  //          !event.target.className.includes('fa fa-comment') ) {
  //           this.showChatComponent = this.showChatMessageDiv = false;
  //         } else if (event.target.className.includes('fa fa-comment') || event.target.className.includes('chat-page-icon')) {
  //           this.showChatMessageDiv = false;
  //         }
  //     } catch (error) {
  //         console.log('error = ', error);
  //     }
  // }
 async initFirebase() {
    firebase.initializeApp(firebaseInit);
    await this.swPush.requestSubscription({serverPublicKey: pushCertificateKey}).then(res => {
    }).catch(error => {
      console.log('from requestSubscription  = ', error);
    });
    await this.swPush.messages.subscribe((res) => {
    }, error => {
      console.log('on Notification error = ', error);
    });
    await this.swPush.notificationClicks.subscribe(response => {
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
    if (event && event === 'login') {
      this.loginData = this.commonService.getLocalStorageObj('loginUserData');
      if (this.loginData) {
      } else {
        const loginModalRef = this.modalService.open(LoginComponent);
        loginModalRef.result
          .then(res => {
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

  chatPage() {
    this.loginData = this.commonService.getLocalStorageObj('loginUserData');
    this.showChatMessageDiv  = false;
    if (this.loginData) {
      this.showChatComponent = !this.showChatComponent;
    } else {
      this.showChatComponent = false;
      const loginModalRef = this.modalService.open(LoginComponent);
      loginModalRef.result
          .then(res => {
            this.showChatComponent = true;
            // this.commonService.chatPageEvents(true);
          })
          .catch(err => {
            console.log('err = ', err);
          });
    }
  }
}
