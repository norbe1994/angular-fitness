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

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

  onClose() {
    this.sidenavClose.emit()
  }
}
