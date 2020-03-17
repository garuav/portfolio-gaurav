import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  ) {
    this.commonService.loginLogoutSubjectObservable.subscribe(res => {
      if (res) {
        this.activeModal.close('Successfully Logged In');
      }
    });
  }

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
    this.commonService.googleLogin();
  }
}
