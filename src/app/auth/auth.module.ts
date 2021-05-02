import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule,
  ],
  exports: []
})
export class AuthModule {}
