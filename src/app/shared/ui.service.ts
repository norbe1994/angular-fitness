import { Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UIService {
  public loadingStateChanged = new Subject<boolean>()

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration,
    })
  }
}
