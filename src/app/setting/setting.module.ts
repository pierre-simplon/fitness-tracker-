import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared/shared.module";
import { SettingComponent } from "./setting.component";


@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
exports: []})
export class SettingModule {}
