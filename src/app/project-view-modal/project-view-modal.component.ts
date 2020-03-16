import { NgbActiveModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './../services/common.service';
import { ProjectData } from './../common/project-data';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-view-modal',
  templateUrl: './project-view-modal.component.html',
  styleUrls: ['./project-view-modal.component.scss'],
})
export class ProjectViewModalComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('tabsData') tabsData: ProjectData;
  @ViewChild(NgbNav) nav: NgbNav;
  tabsList: ProjectData[];
  constructor(
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) {
    this.tabsList = [];
    this.commonService.getTabsSubjectSubscribe().subscribe(tab => {
      this.tabsList.push(tab);
    });
  }

  ngOnInit(): void {
    console.log('this.activeModal = ', this.activeModal);
    this.tabsList.push(this.tabsData);
  }
  closeModal() {
    this.activeModal.dismiss('closed');
  }
  onNavChange(event) {
    console.log(event);
  }
  getSanitizeURL(url) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
