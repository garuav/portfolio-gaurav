import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkillsComponent } from './skills/skills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { PreviousEmployerListComponent } from './previous-employer-list/previous-employer-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectsWorkedComponent } from './projects-worked/projects-worked.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatPageComponent,
    LoginComponent,
    SkillsComponent,
    ProjectsListComponent,
    PreviousEmployerListComponent,
    SidebarComponent,
    ProjectsWorkedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
