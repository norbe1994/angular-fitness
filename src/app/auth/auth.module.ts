import { NgModule } from '@angular/core'

import { LoginComponent } from '../auth/login/login.component'
import { SignupComponent } from '../auth/signup/signup.component'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireAuthModule } from 'angularfire2/auth'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, AngularFireAuthModule],
  exports: [FormsModule],
})
export class AuthModule {}
