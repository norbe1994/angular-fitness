import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from 'src/app/providers/training.service'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<any>()
  public progress: number = 0
  private timer: any

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    const step = (this.trainingService.getRunningExercise().duration / 100) * 1000
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        this.progress = 100
        clearInterval(this.timer)
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit()
      } else {
        this.startTimer()
      }
    })
  }
}
