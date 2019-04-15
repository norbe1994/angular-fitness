import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { User } from '../auth/user.model'
import { AuthData } from '../auth/auth-data'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>()
  private user: User

  constructor() {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.authChange.next(true)
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.authChange.next(true)
  }

  logout() {
    this.user = null
    this.authChange.next(false)
  }

  getUser(): User {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null
  }
}
