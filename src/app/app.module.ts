import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { PastComponent } from './training/past/past.component'
import { CurrentComponent } from './training/current/current.component'
import { NewComponent } from './training/new/new.component'
import { TrainingComponent } from './training/training.component'

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
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
