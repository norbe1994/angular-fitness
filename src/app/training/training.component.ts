import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { TrainingService } from '../providers/training.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  public ongoingTraining: boolean = false
  public exerciseSubscription: Subscription

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false
      }
    })
  }
}
