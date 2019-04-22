import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireModule } from 'angularfire2'
import { StoreModule } from '@ngrx/store'
import { reducers } from './app.reducer'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { AuthService } from './providers/auth.service'
import { TrainingService } from './providers/training.service'
import { environment } from '../environments/environment'
import { UIService } from './shared/ui.service'
import { AuthModule } from './auth/auth.module'
import { AngularFirestoreModule } from 'angularfire2/firestore'

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HeaderComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
