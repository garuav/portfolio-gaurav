import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import '@firebase/messaging';
import { Subject, Observable } from 'node_modules/rxjs';
import 'firebase/database';
import 'firebase/auth'; // for authentication
import 'firebase/firestore';
import { SwPush } from '@angular/service-worker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverKey, pushCertificateKey } from 'src/common.constants';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private loginLogoutSubject = new Subject<boolean>();
  loginLogoutSubjectObservable = this.loginLogoutSubject.asObservable();
  mobileAppToken;
  constructor(private sw: SwPush, private http: HttpClient) {}
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider= ', provider);
    // tslint:disable-next-line:variable-name
    const registration_token = this.getLocalStorageObj('registration_token');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        if (result && result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
          const token = result.credential.accessToken;
          // The signed-in user info.
          console.log('result = ', result);
          const user = result.user;
          const temp: any = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            loginToken: token,
            uid: user.uid,
            registration_token
          };
          this.setLocalStorageObj('loginUserData', temp);
          this.loginLogoutEvents(true);
          this.saveUser(temp).then(res => {
            this.sendNotification('user_loggedin', temp).subscribe(( response: any) => {
              console.log('response = ', response);
            }, error => {
              console.log('error = ', error);
            });
          }).catch(error => {
            console.log('error = ', error);
          });
        } else {
          this.saveDataToUsersCollection('registered').then(response => {
            console.log('saved user to collections = ', response);
          }).catch(error => {
            console.log('error  collections = ', error);
          });
          this.getDataIfUserExists(result.user.uid).then(res => {
            console.log('response of exsisitng user = ', res.val());
            const user = {
              displayName: res.val().displayName,
              email: res.val().email,
              loginToken: res.val().loginToken,
              photoURL: res.val().photoURL,
              uid: res.val().uid,
              registration_token: res.val().registration_token,
            };
            this.setLocalStorageObj('loginUserData', user);
            this.loginLogoutEvents(true);
          }).catch(error => {
            console.log('error of exsisitng user = ', error);

          });
        }
      })
      .catch(error => {
        // Handle Errors here.
        console.log('error signIn = ', error);
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
    console.log('loginData = ', loginData);
    this.saveDataToUsersCollection('registered').then(response => {
      console.log('saved user to collections = ', response);
    }).catch(error => {
      console.log('error  collections = ', error);
    });
    return firebase
      .database()
      .refFromURL('https://portfolio-3881c.firebaseio.com/' + loginData.uid).update(loginData);
      // .set(loginData, res => {
      //   console.log('res = ', res);
      // });
  }
  // firebase save data to DB--end
  loginLogoutEvents(isLoggedin: boolean) {
    this.loginLogoutSubject.next(isLoggedin);
  }

  getRegistrationToken() {
      const messaging =  firebase.messaging();
      Notification.requestPermission().then(res => {
      messaging.usePublicVapidKey(pushCertificateKey);
      messaging.getToken().then((token: any) => {
        console.log('token = ', token);
        this.setLocalStorageObj('registration_token', token);
        if (this.getLocalStorageObj('loginUserData')) {
          this.updateDatabseData('registration_token', token);
        }

      }).catch(error => {
        console.log('error = ', error);
      });
    }).catch(error => {

    });
  }
  async onTokenRefresh() {
    const messaging =  firebase.messaging();
    await messaging.onTokenRefresh((token: any) => {
      console.log('token = ', token);
      this.setLocalStorageObj('registration_token', token);
      if (this.getLocalStorageObj('loginUserData')) {
        this.updateDatabseData('registration_token', token);
      }
    }, error =>  {
      console.log('error = ', error);
    });
  }

  getMobileToken() {
    firebase.firestore().collection('userData').get().then( response => {
      response.forEach((doc) => {
        console.log('response data mobile app = ', doc.data());
        this.setLocalStorageObj('mobileapp_token', doc.data().registration_token);
        this.mobileAppToken = doc.data().registration_token;
    });
      }).catch(error => {
      console.log('error= ', error);

      });
  }
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const messaging =  firebase.messaging();
      navigator.serviceWorker.register('ngsw-worker.js', {scope: '/'})
      .then((registration) => {
        console.log('registration = ', registration);
        messaging.useServiceWorker(registration);
      });
    } else {
      console.log('false');
      }
  }
  updateDatabseData(key: string, value: any) {
      console.log('update DB key === ', key, ' value = ', value);
      const loginUserInfo = this.getLocalStorageObj('loginUserData');
      loginUserInfo[key] = value;
      firebase.database().refFromURL('https://portfolio-3881c.firebaseio.com/' + loginUserInfo.uid).child(key).set(value)
      .then(res => {
        console.log('update user data res = ', res);
        }).catch(error => {
          console.log('update data error = ', error);
        });
  }
  sendNotification(type: string, data: any): Observable<any> {
    if (this.mobileAppToken) {
      const header = new HttpHeaders({
        Authorization: `key=${serverKey}`,
        'Content-Type': 'application/json'
      });
      console.log('headers = ', header);
      const randomNum = Math.round(Math.random() * (99999 - 0 + 1)) + 0;
      const payload = {
        registration_ids: [this.mobileAppToken],
        data: {
          title: type === 'user_loggedin' ? 'New User Logged In' : 'Chat Notification',
          body: type === 'user_loggedin' ? data.displayName + ' Logg In to portfolio' : data.messageTxt,
          object_id: randomNum,
          icon: '../../favicon.ico',
          objectType: 'user_loggedin' ? 'new_user' : 'chat_notification',
          uid: data.uid,
          registration_token: data.registration_token,
          dateTime: new Date()
        },
        content_available: true
      };
      if (type === 'contact') {
        payload.data.title = `${data.name} Contacted You` ;
        payload.data.objectType = 'contact';
        payload.data.body = data.description;
      }
      return  this.http.post(`https://fcm.googleapis.com/fcm/send`, payload, { headers: header});
    }
  }

  saveChatMessages(message) {
      const loginUserInfo = this.getLocalStorageObj('loginUserData');
      return firebase.database().refFromURL('https://portfolio-3881c.firebaseio.com/' + loginUserInfo.uid)
      .child('messages').push().update(message);
  }
  getAllMessages() {
    const loginUserInfo = this.getLocalStorageObj('loginUserData');
    return firebase.database().refFromURL('https://portfolio-3881c.firebaseio.com/' + loginUserInfo.uid).child('messages');
  }
  getDataIfUserExists(uid) {
    return firebase.database().refFromURL('https://portfolio-3881c.firebaseio.com/' + uid).once('value');
  }
  saveContactData(data) {
    this.saveDataToUsersCollection('contacted').then(response => {
      console.log('saved user to collections = ', response);
    }).catch(error => {
      console.log('error  collections = ', error);
    });
    return firebase.database().refFromURL('https://portfolio-3881c.firebaseio.com/' ).child('contact').push().update(data);
  }

  saveDataToUsersCollection(regType: string) {
   const userRef =  firebase.firestore().collection('userData').doc('UsersData');
   return  firebase.firestore().runTransaction((transaction) => {
      return transaction.get(userRef).then(res => {
        if (res.exists) {
          switch (regType) {
            case 'registered':
              userRef.update({
                RegisteredUsers : res.data().RegisteredUsers + 1,
              });
              break;
            case 'anonymous':
              userRef.update({
                AnonymousUsers : res.data().AnonymousUsers + 1,
              });
              break;
              case 'contacted':
              userRef.update({
                ContactedUsers : res.data().ContactedUsers + 1,
              });
              break;
              case 'visits':
                userRef.update({
                  UsersVisits : res.data().UsersVisits + 1,
                });
                break;
          }
        }
      });
    });
    // .then( response => {
    //   response.forEach((doc) => {
    //     console.log('response data mobile app = ', doc.data());
    //     this.setLocalStorageObj('mobileapp_token', doc.data().registration_token);
    //     this.mobileAppToken = doc.data().registration_token;
    // });
    //   }).catch(error => {
    //   console.log('error= ', error);

    //   });
  }
}
