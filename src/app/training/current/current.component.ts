import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from 'src/app/providers/training.service'
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators'
import * as fromTraining from '../training.reducer'
import { Exercise } from '../exercise.model'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit {
  public progress: number = 0
  private timer: any

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) {}

  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        const step = (exercise.duration / 100) * 1000
        this.timer = setInterval(() => {
          this.progress += 1
          if (this.progress >= 100) {
            this.progress = 100
            this.trainingService.completeExercise()
            clearInterval(this.timer)
          }
        }, step)
      })
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
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startTimer()
      }
    })
  }
}
