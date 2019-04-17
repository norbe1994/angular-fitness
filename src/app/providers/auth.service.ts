import { Subject } from 'rxjs/Subject'
import { AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core'
import { AuthData } from '../auth/auth-data'
import { Router } from '@angular/router'
import { TrainingService } from './training.service'
import { MatSnackBar } from '@angular/material/snack-bar'

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
    private snackBar: MatSnackBar,
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
    this.auth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {})
      .catch(err => {
        this.openSnackBar(err.message, 'cerrar', 5000)
      })
  }

  login(authData: AuthData) {
    this.auth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {})
      .catch(err => {
        this.openSnackBar(err.message, 'close', 5000)
      })
  }

  logout() {
    this.auth.auth.signOut()
  }

  isAuth() {
    return this.isAuthenticated
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    })
  }
}
