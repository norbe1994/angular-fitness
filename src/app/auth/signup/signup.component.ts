import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription, Observable } from 'rxjs'
import { AuthService } from 'src/app/providers/auth.service'
import { UIService } from 'src/app/shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public maxDate: Date
  public isLoading$: Observable<boolean>
  // public isLoading: boolean = false
  // private loadingSubs: Subscription

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    /*  this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    }) */
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    })
  }

  /* ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe()
    }
  } */
}
