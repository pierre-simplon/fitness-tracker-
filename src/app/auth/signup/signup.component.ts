import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiservice: UIService,
    private store: Store<fromRoot.State>,
    )
    { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthdate: ['',Validators.required],
      agree: ['',Validators.required],
    })
  }

  get getControl(){
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    })
    this.uiservice.loadingStateChanged.next(true);
  }

}
