import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingComponent } from "./stop-training/stop-training.component";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";
import { StoreModule} from '@ngrx/store'
import { trainingReducer } from "./training.reducer";

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
    TrainingRoutingModule,
    StoreModule.forFeature('training',trainingReducer),
  ],
exports: []})
export class TrainingModule {}
