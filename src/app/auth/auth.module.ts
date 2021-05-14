import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
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
    AuthRoutingModule,
  ],
  exports: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AuthModule {}
