import { ChatPageComponent } from './chat-page/chat-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsWorkedComponent } from './projects-worked/projects-worked.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home Called', animation: 'isRight' },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    component: ChatPageComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'projects',
    component: ProjectsWorkedComponent,
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
