import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { AuthService } from 'src/app/providers/auth.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>()
  public isAuth$: Observable<boolean>
  public authSubscription: Subscription

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onClose() {
    this.sidenavClose.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }
}
