import { AboutComponent } from './about/about.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsWorkedComponent } from './projects-worked/projects-worked.component';
import { ContactComponent } from './contact/contact.component';

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
    path: 'projects',
    component: ProjectsWorkedComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { animation: 'isRight' },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
