import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AppComponent } from './app.component'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { PastComponent } from './training/past/past.component'
import { CurrentComponent } from './training/current/current.component'
import { NewComponent } from './training/new/new.component'
import { TrainingComponent } from './training/training.component'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { StopTrainingComponent } from './training/current/stop-training.component'
import { AuthService } from './providers/auth.service'
import { TrainingService } from './providers/training.service'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    PastComponent,
    CurrentComponent,
    NewComponent,
    TrainingComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
