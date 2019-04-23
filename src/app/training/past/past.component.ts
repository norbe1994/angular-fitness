import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../exercise.model'
import { TrainingService } from 'src/app/providers/training.service'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import * as fromTraining from '../training.reducer'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state']
  public dataSource = new MatTableDataSource<Exercise>()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((data: Exercise[]) => {
      this.dataSource.data = data
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterParam: string) {
    this.dataSource.filter = filterParam.trim().toLocaleLowerCase()
  }
}
