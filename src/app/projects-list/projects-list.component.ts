import { ProjectViewModalComponent } from './../project-view-modal/project-view-modal.component';
import { CommonService } from './../services/common.service';
import { ProjectData } from './../common/project-data';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('projectData') projectData: ProjectData;
  constructor(
    private commonService: CommonService,
    private el: ElementRef,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('this.projectData = ', this.projectData);
    this.renderer.addClass(
      this.el.nativeElement,
      'project-card' + this.projectData.project_id
    );
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.commonService.animateCSS(
    //     '.project-card' + this.projectData.project_id,
    //     'zoomIn',
    //     () => {
    //       // Do something after animation
    //     }
    //   );
    // }, 1000);
  }
  openTab(openTab) {
    this.commonService.addTabsObservable(openTab);
  }
}
