import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit, OnDestroy {
  public exercises: Exercise[]
  public exerciseSubscription: Subscription
  public isLoading: boolean = true

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (data: Exercise[]) => {
        this.exercises = data
        this.isLoading = false
      },
    )
    this.fetchExercises()
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }
}
