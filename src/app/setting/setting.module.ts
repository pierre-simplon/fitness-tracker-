import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../shared/shared.module";
import { SettingComponent } from "./setting.component";
import { SettingsRoutingModule } from "./settings-routing.module";


@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    SettingsRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SettingModule {}
