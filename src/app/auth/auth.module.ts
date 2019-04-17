import { NgModule } from '@angular/core'

import { LoginComponent } from '../auth/login/login.component'
import { SignupComponent } from '../auth/signup/signup.component'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  exports: [FormsModule],
})
export class AuthModule {}
