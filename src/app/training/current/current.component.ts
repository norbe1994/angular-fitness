import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit {
  public progress: number = 0
  private timer: number

  constructor() {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 500)
  }

  onStop() {
    clearInterval(this.timer)
  }
}
