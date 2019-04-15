import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training.component'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit {
  public progress: number = 0
  private timer: any

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 500)
  }

  onStop() {
    clearInterval(this.timer)
    this.dialog.open(StopTrainingComponent)
  }
}
