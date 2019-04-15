import { Component, OnInit } from '@angular/core'
import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  public exercises: Exercise[] = []

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }
}
