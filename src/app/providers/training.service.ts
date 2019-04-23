import { Injectable } from '@angular/core'
import { Exercise } from '../training/exercise.model'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { map, take } from 'rxjs/operators'
import { UIService } from '../shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromTraining from '../training/training.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from '../training/training.actions'

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()
  public finishedExercisesChanged = new Subject<Exercise[]>()
  private availableExercises: Exercise[] = []
  private runningExercise: Exercise
  private fbSubs: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map((doc: any) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories,
              }
            })
          }),
        )
        .subscribe(
          (data: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading())
            this.store.dispatch(new Training.SetAvailableTrainings(data))
          },
          err => {
            console.log('ERROR:', err.message)
            this.store.dispatch(new UI.StopLoading())
            this.uiService.openSnackBar('Fetching exercises failed', null, 3000)
            this.exerciseChanged.next(null)
          },
        ),
    )
  }

  startExercise(id: string) {
    this.store.dispatch(new Training.StartTraining(id))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).subscribe((exercise: Exercise) => {
      this.addDataToDatabase({ ...exercise, date: new Date(), state: 'completed' })
      this.store.dispatch(new Training.StopTraining())
    })
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this.addDataToDatabase({
          ...exercise,
          duration: (exercise.duration * progress) / 100,
          calories: (exercise.calories * progress) / 100,
          date: new Date(),
          state: 'completed',
        })
        this.store.dispatch(new Training.StopTraining())
      })
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((data: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(data))
          this.store.dispatch(new UI.StopLoading())
        }),
    )
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(data: Exercise) {
    this.db
      .collection('finishedExercises')
      .add(data)
      .then(data => {
        console.log('write to db successful')
      })
      .catch(err => console.log(err))
  }
}
