import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";

@NgModule({
  imports : [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,],
  exports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule {}
