import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore'

import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  public exercises: Observable<any>

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {}

  ngOnInit() {
    this.exercises = this.db.collection('availableExercises').valueChanges()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }
}
