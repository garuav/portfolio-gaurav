import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { CommonService } from '../services/common.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    config: NgbModalConfig
  ) {}

  ngOnInit(): void {
    console.log('called home page = ', this.route.queryParams);
  }
}
