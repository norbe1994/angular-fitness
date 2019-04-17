import { NgModule } from '@angular/core'

import { LoginComponent } from '../auth/login/login.component'
import { SignupComponent } from '../auth/signup/signup.component'

import { AngularFireAuthModule } from 'angularfire2/auth'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AngularFireAuthModule, SharedModule],
  exports: [],
})
export class AuthModule {}
