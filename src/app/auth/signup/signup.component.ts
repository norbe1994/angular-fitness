import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/providers/auth.service'
import { UIService } from 'src/app/shared/ui.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public maxDate: Date
  public isLoading: boolean = false
  private loadingSubs: Subscription

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }
}
