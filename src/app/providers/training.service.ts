import { Injectable } from '@angular/core'
import { Exercise } from '../training/exercise.model'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { map } from 'rxjs/operators'
import { UIService } from '../shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'

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
    private store: Store<fromRoot.State>,
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
            this.availableExercises = data
            this.exercisesChanged.next([...this.availableExercises])
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
    this.db.doc('availableExercises/' + id).update({ lastSelected: new Date() })
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === id)
    this.exerciseChanged.next({ ...this.runningExercise })
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: (this.runningExercise.duration * progress) / 100,
      calories: (this.runningExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled',
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((data: Exercise[]) => {
          this.finishedExercisesChanged.next(data)
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
