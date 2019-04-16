import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../exercise.model'
import { TrainingService } from 'src/app/providers/training.service'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'

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

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterParam: string) {
    this.dataSource.filter = filterParam.trim().toLocaleLowerCase()
  }
}
