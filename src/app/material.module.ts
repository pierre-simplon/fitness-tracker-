import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SignupComponent } from "./auth/signup/signup.component";


const modules = [
  MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule
];

@NgModule({
imports: [...modules],
exports: [...modules],
declarations: []
})
export class MaterialModule {};