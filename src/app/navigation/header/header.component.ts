import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { AuthService } from 'src/app/providers/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>()
  public isAuth: boolean = false
  public authSubscription: Subscription

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStaus => {
      this.isAuth = authStaus
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }
}
