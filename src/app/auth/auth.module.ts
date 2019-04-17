import { NgModule } from '@angular/core'

import { LoginComponent } from '../auth/login/login.component'
import { SignupComponent } from '../auth/signup/signup.component'

import { AngularFireAuthModule } from 'angularfire2/auth'
import { SharedModule } from '../shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AngularFireAuthModule, SharedModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
