import { NgModule } from '@angular/core'

import { PastComponent } from '../training/past/past.component'
import { CurrentComponent } from '../training/current/current.component'
import { NewComponent } from '../training/new/new.component'
import { TrainingComponent } from '../training/training.component'
import { StopTrainingComponent } from './current/stop-training.component'

import { SharedModule } from '../shared/shared.module'
import { TrainingRoutingModule } from './training-routing.module'

@NgModule({
  declarations: [
    PastComponent,
    CurrentComponent,
    NewComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
