import { CommonService } from './../services/common.service';
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  AfterViewInit,
  AfterContentInit,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';
import { ProjectData } from '../common/project-data';
import { ProjectsListComponent } from '../projects-list/projects-list.component';
import { ProjectDataRefDirective } from './project-data-ref.directive';

@Component({
  selector: 'app-projects-worked',
  templateUrl: './projects-worked.component.html',
  styleUrls: ['./projects-worked.component.scss'],
})
export class ProjectsWorkedComponent implements OnInit, AfterContentInit {
  projectsData: ProjectData[];

  constructor(
  ) {}
  @ViewChild(ProjectDataRefDirective, { static: true })
  projectListRef: ProjectDataRefDirective;
  ngOnInit(): void {
    this.projectsData = [
      {
        project_id: 4,
        project_name: 'HUNDŌ',
        project_description: `HUNDŌ applies stock market principles to offer an entirely new fantasy sports experience.
The HUNDŌ Exchange enables users to buy or
 sell shares in a variety of sporting events.
  Tickers range from a team winning a single game,
   division or league championship, to an individual player winning an award like MVP or Rookie of the Year.`,
        url: 'https://www.hundoexchange.com/',
        language_framework: 'Angular 6, Ionic Framework, CSS3',

        images: 'assets/project-images/hundoexchange.png',
      },
      {
        project_id: 3,
        project_name: 'HFYK',
        project_description:
          // tslint:disable-next-line:max-line-length
          `It’s a game of HIRE and FIRE and not only teaches them to work for their allowance but rewards & recognizes them for good behaviour.
          Kids are loving the ‘game-like’ reward and
          recognition system and parents are enjoying
           living with less friction in the household.
           Your family values are clearly communicated and the kids know exactly what's expected of them.`,
        language_framework: 'Angular 6, Ionic Framework, CSS3',

        url: 'https://hireandfireyourkids.com/',
        images: 'assets/project-images/hireandfire.png',
      },
      {
        project_id: 5,
        project_name: 'Trade 360',
        project_description: 'testing ',
        url: '',
        language_framework: 'Angular 8,  CSS3',

        images: '',
      },
      {
        project_id: 6,
        project_name: 'Dashboarding Solution',
        project_description: 'testing ',
        url: '',
        language_framework: 'Angular 8,  CSS3',

        images: '',
      },
      {
        project_id: 1,
        project_name: 'Pace HCM',
        project_description:
          // tslint:disable-next-line:max-line-length
          'HRM Project used to automate the recruitment process of candidates from screening stage to On Boarding stage.',
        url: 'https://www.pacehcm.com/',
        language_framework: ' AngularJS(1.6), CSS3, Bootsrtap3.',
        images: 'assets/project-images/pacehcm.png',
      },
      {
        project_id: 2,
        project_name: 'What Mate',
        project_description:
          // tslint:disable-next-line:max-line-length
          'A Digital Transformation Platform to help users manage all their transactions related to operations and business through ChatBot guided by chat text inputs or by voice instructions. ',
        url: 'https://www.whatmate.com/',
        language_framework: ' AngularJS(1.6), CSS3, Bootsrtap3.',

        images: 'assets/project-images/whatmate.png',
      },
    ];
  }
  ngAfterContentInit() {
  }

}
