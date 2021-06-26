import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { trainingReducer } from "../training/training.reducer";
import { SettingComponent } from "./setting.component";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SetTrainingComponent } from './set-training/set-training.component';
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SettingComponent,
    SetTrainingComponent,
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    SettingsRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SettingModule { }
