import { CommonService } from './../services/common.service';
import { ProjectData } from './../common/project-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('projectsList') projectsList: ProjectData;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    console.log('this.projectsList = ', this.projectsList);
    this.commonService.animateCSS('.project-card', 'bounce', () => {
      // Do something after animation
    });
  }
}
