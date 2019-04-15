import { Component, OnInit, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {}

  onStartTraining() {
    this.trainingStart.emit()
  }
}
