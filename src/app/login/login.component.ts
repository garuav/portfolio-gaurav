import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData;
  constructor(
    public activeModal: NgbActiveModal,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    console.log('this.activeMiodal = ', this.activeModal);
  }
  signUp(type) {
    switch (type) {
      case 'google':
        this.googleLogin();
        break;
    }
  }
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
        const userData = {
          token,
          ...user,
        };
        this.loginData = userData;
        console.log('this.loginData = ', this.loginData);
        this.commonService.setLocalStorageObj('LoginUserData', userData);
        // ...
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
}
