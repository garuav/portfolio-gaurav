import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsWorkedComponent } from './projects-worked/projects-worked.component';
import { AboutComponent } from './about/about.component';
import { ProjectDataRefDirective } from './projects-worked/project-data-ref.directive';
import { HeaderComponent } from './header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimeFormatPipe } from './common/date-time-format.pipe';
import { ContactComponent } from './contact/contact.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatPageComponent,
    LoginComponent,
    ProjectsWorkedComponent,
    AboutComponent,
    ProjectDataRefDirective,
    HeaderComponent,
    DateTimeFormatPipe,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('../ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
