import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  loginData;
  formSubmitted: boolean;
  constructor(private fb: FormBuilder, private commonService: CommonService) { }

  ngOnInit(): void {
    this.loginData = this.commonService.getLocalStorageObj('loginUserData');
    this.formSubmitted = false;
    this.createForm();
  }
  createForm() {
    this.contactForm = this.fb.group({
      name: [(this.loginData && this.loginData.displayName) ? this.loginData.displayName : '', [Validators.required]],
      email: [(this.loginData && this.loginData.email) ? this.loginData.email : '', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  saveContactForm() {
    // console.log('contactForm = ', this.contactForm);
    this.formSubmitted = true;
    if (this.formSubmitted && this.contactForm.valid) {
      this.commonService.sendNotification('contact', this.contactForm.value).subscribe(response => {
        // console.log('response from send notification = ', response);
        const contactValue = this.contactForm.value;
        if (this.loginData && this.loginData.uid) {
          contactValue.uid = this.loginData.uid;

        }
        this.commonService.saveContactData(contactValue).then(res => {
        // console.log('response from save contact = ', res);
        this.formSubmitted = false;
        this.createForm();

      }).catch(error => {
        console.log('error from save contact = ', error);

      })
      }, error => {
        console.log('error send notification = ', error);

      });
    }
  }

}
