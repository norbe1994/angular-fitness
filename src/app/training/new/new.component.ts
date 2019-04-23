import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'
import { Subscription, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { UIService } from 'src/app/shared/ui.service'
import * as fromRoot from '../../app.reducer'
import * as fromTraining from '../training.reducer'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  public exercises$: Observable<Exercise[]>
  public exercisesSubscription: Subscription
  public isLoading$: Observable<boolean>
  // public isLoading: boolean = true

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
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
