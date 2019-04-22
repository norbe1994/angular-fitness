import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'
import { Subscription, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'
import { UIService } from 'src/app/shared/ui.service'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  public exercises: Exercise[]
  public exercisesSubscription: Subscription
  public isLoading$: Observable<boolean>
  // public isLoading: boolean = true

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(
      (data: Exercise[]) => {
        this.exercises = data
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

  /* ngOnDestroy() {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe()
    }
  } */
}
