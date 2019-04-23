import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { AuthService } from 'src/app/providers/auth.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  public isAuth$: Observable<boolean>
  public authSubscription: Subscription

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }
}
