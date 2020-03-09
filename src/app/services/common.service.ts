import { ProjectData } from './../common/project-data';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject, Observable } from 'node_modules/rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  projectViewTabs: ProjectData[];

  private isProjectViewVisible = new Subject();
  private addTabsSubject = new Subject();
  addTabsSubjectObservable(tabData: ProjectData) {
    this.addTabsSubject.next(tabData);
  }
  getTabsSubjectSubscribe(): Observable<any> {
    return this.addTabsSubject.asObservable();
  }
  addTabsObservable(tabData: ProjectData) {
    this.isProjectViewVisible.next(tabData);
  }
  getTabsSubscribe(): Observable<any> {
    return this.isProjectViewVisible.asObservable();
  }
  constructor() {}

  googleLogin(): any {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider= ', provider);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userData = {
          token,
          ...user,
        };
        console.log('userData = ', userData);

        const temp: string = JSON.stringify(userData);
        console.log('temp = ', temp);

        localStorage.setItem('loginUserData', userData);
        // this.setLocalStorageObj('loginUserData', userData);
        return userData;
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        return error;
      });
  }

  getLocalStorageObj(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  // tslint:disable-next-line:ban-types
  setLocalStorageObj(key: string, value): void {
    console.log('key = ', key, ' value = ', value);
    localStorage.setItem(key, JSON.stringify(value));
    // console.log(JSON.parse(window.localStorage.getItem(key)));
  }

  animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') {
        callback();
      }
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  // tabs CRUD start
  addTab(data) {
    this.projectViewTabs.push(data);
  }

  removeTab(index) {
    this.projectViewTabs.splice(index, 1);
    if (index === 0 && this.projectViewTabs.length === 1) {
      this.getSelectedTab(0);
    } else if (index !== 0 && this.projectViewTabs.length >= 1) {
      this.getSelectedTab(index + 1);
    }
  }

  getSelectedTab(index) {
    this.projectViewTabs.filter((item, objIndex) => {
      if (index === objIndex) {
        item.isTabSelected = true;
      } else {
        item.isTabSelected = false;
      }
      return item;
    });
  }
  getAllTabs() {
    return this.projectViewTabs;
  }
  // tabs CRUD end
}
