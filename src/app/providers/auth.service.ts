import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { User } from '../auth/user.model'
import { AuthData } from '../auth/auth-data'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>()
  private user: User

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.authSuccessfully()
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.authSuccessfully()
  }

  logout() {
    this.user = null
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  getUser(): User {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null
  }

  private authSuccessfully() {
    this.authChange.next(true)
    this.router.navigate(['/training'])
  }
}
