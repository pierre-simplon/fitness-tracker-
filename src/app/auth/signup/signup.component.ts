import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ReplaySubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading: boolean = false;
  destroyed$ = new ReplaySubject(1);
  private loadingSubscription:Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiservice: UIService,
    )
    { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiservice.loadingStateChanged
    .pipe(takeUntil(this.destroyed$))
    .subscribe(isLoading => {this.isLoading = isLoading});
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

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
