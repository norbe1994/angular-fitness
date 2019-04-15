import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { TrainingService } from 'src/app/providers/training.service'
import { Exercise } from '../exercise.model'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>()
  public exercises: Exercise[] = []

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises()
  }

  onStartTraining() {
    this.trainingStart.emit()
  }
}
