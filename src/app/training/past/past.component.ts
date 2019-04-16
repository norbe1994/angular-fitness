import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../exercise.model'
import { TrainingService } from 'src/app/providers/training.service'

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state']
  public dataSource = new MatTableDataSource<Exercise>()

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
  }
}
