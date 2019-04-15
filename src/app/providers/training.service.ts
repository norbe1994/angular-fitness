import { Injectable } from '@angular/core'
import { Exercise } from '../training/exercise.model'
import { Subject } from 'rxjs/Subject'

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ]
  private runningExercise: Exercise

  constructor() {}

  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  startExercise(id: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === id)
    console.log(this.runningExercise)
    this.exerciseChanged.next({ ...this.runningExercise })
  }
}
