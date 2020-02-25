import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { CommonService } from '../services/common.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
  loginData: any;
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('called home page = ', this.route.queryParams);
  }
  headerOutputEvents(event) {
    console.log('event = ', event);
    if (event && event === 'login') {
      this.loginData = this.commonService.getLocalStorageObj('LoginUserData');
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
