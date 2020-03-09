import { Component, OnInit } from '@angular/core';
import { CommonReferences } from '../common/common.references';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skillsList: CommonReferences[];
  constructor() {}

  ngOnInit(): void {
    this.skillsList = [
      {
        skill_name: 'Java Script',
        skill_value: 80,
      },
      {
        skill_name: 'Angular',
        skill_value: 85,
      },
      {
        skill_name: 'CSS',
        skill_value: 80,
      },
      {
        skill_name: 'SCSS',
        skill_value: 70,
      },
      {
        skill_name: 'Ionic Framework',
        skill_value: 80,
      },
      {
        skill_name: 'Git hub',
        skill_value: 90,
      },
    ];
  }
}
