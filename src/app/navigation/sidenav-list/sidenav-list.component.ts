import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { AuthService } from 'src/app/providers/auth.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>()
  public isAuth: boolean = false
  public authSubscription: Subscription

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStaus => {
      this.isAuth = authStaus
    })
  }

  onClose() {
    this.sidenavClose.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }
}
