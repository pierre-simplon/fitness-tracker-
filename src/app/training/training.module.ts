import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingComponent } from "./stop-training/stop-training.component";
import { TrainingComponent } from "./training.component";

@NgModule({
  declarations: [
    TrainingComponent,
    StopTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
exports: []})
export class TrainingModule {}
