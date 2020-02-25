import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseInit } from '../common.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.initFirebase();
  }
  initFirebase() {
    firebase.initializeApp(firebaseInit);
  }
}
