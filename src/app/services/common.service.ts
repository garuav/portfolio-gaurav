import { ProjectData } from './../common/project-data';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Subject, Observable, BehaviorSubject } from 'node_modules/rxjs';
import 'firebase/database';
import 'firebase/auth'; // for authentication

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private loginLogoutSubject = new Subject<boolean>();
  loginLogoutSubjectObservable = this.loginLogoutSubject.asObservable();
 
  constructor() {}

  googleLogin() {
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
        const temp: any = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          token,
          uid: user.uid,
        };
        this.setLocalStorageObj('loginUserData', temp);
        this.loginLogoutEvents(true);
        this.saveUser(temp);
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



  // firebase save data to DB--start
  saveUser(loginData) {
    // const ref = firebase
    //   .database()
    //   .ref('https://portfolio-3881c.firebaseio.com/');
    // ref
    //   .orderByChild('email')
    //   .equalTo(loginData.email)
    //   .on('child_added', snapshot => {
    //     console.log(snapshot.key);
    //   });
    console.log('loginData = ', loginData);
    firebase
      .database()
      .refFromURL('https://portfolio-3881c.firebaseio.com/' + loginData.uid)
      .set(loginData, res => {
        console.log('res = ', res);
      })
      .then(res => {
        console.log('res = ', res);
      })
      .catch(error => {
        console.log('error = ', error);
      });
  }
  // firebase save data to DB--end
  loginLogoutEvents(isLoggedin: boolean) {
    this.loginLogoutSubject.next(isLoggedin);
  }
}
