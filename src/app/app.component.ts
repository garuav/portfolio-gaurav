import { ProjectViewModalComponent } from './project-view-modal/project-view-modal.component';
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
  tabsData;
  projectViewModalRef;
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService
  ) {
    this.commonService.getTabsSubscribe().subscribe(tab => {
      console.log('tab = ', tab);
      this.tabsData = tab;
      if (!this.projectViewModalRef) {
        this.projectViewModalRef = this.modalService.open(
          ProjectViewModalComponent,
          { backdrop: 'static', windowClass: 'project-view-modal', size: 'xl' }
        );
        this.projectViewModalRef.componentInstance.tabsData = tab;
        this.projectViewModalRef.result
          .then(res => {
            console.log('res = ', res);
          })
          .catch(err => {
            console.log('err = ', err);
            this.projectViewModalRef = undefined;
          });
      } else {
        this.commonService.addTabsSubjectObservable(tab);
      }
    });
  }
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
  projectViewEvents(event) {
    console.log('event = ', event);
  }
}
