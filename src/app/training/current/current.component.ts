import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit {
  public progress: number = 0

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.progress += 5
    }, 500)
  }
}
