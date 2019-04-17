import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'

import { PastComponent } from '../training/past/past.component'
import { CurrentComponent } from '../training/current/current.component'
import { NewComponent } from '../training/new/new.component'
import { TrainingComponent } from '../training/training.component'
import { StopTrainingComponent } from './current/stop-training.component'
import { AngularFirestoreModule } from 'angularfire2/firestore'

@NgModule({
  declarations: [
    PastComponent,
    CurrentComponent,
    NewComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, AngularFirestoreModule],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
