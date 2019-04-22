import { Subject } from 'rxjs/Subject'
import { AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core'
import { AuthData } from '../auth/auth-data'
import { Router } from '@angular/router'
import { TrainingService } from './training.service'
import { UIService } from '../shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>()
  private isAuthenticated: Boolean = false

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true)
        this.router.navigate(['/training'])
        this.isAuthenticated = true
      } else {
        this.trainingService.cancelSubscriptions()
        this.authChange.next(false)
        this.router.navigate(['/login'])
        this.isAuthenticated = false
      }
    })
  }

  registerUser(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.auth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(err => {
        //this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
        this.uiService.openSnackBar(err.message, 'close', 5000)
      })
  }

  login(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.auth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(err => {
        //this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
        this.uiService.openSnackBar('Invalid credentials', 'close', 5000)
      })
  }

  logout() {
    this.auth.auth.signOut()
  }

  isAuth() {
    return this.isAuthenticated
  }
}
