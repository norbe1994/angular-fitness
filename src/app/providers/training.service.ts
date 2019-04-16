import { Injectable } from '@angular/core'
import { Exercise } from '../training/exercise.model'
import { Subject } from 'rxjs/Subject'
import { AngularFirestore } from 'angularfire2/firestore'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()
  private availableExercises: Exercise[] = []
  private runningExercise: Exercise
  private exercises: Exercise[] = []

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
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
      .subscribe((data: Exercise[]) => {
        this.availableExercises = data
        this.exercisesChanged.next([...this.availableExercises])
      })
  }

  startExercise(id: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === id)
    this.exerciseChanged.next({ ...this.runningExercise })
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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

  getCompletedOrCancelledExercises() {
    return this.exercises.slice()
  }
}
