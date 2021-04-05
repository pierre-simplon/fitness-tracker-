import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  maxDate: Date;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthdate: ['',Validators.required],
      agree: ['',Validators.required],
    })
  }

  get getControl(){
    return this.loginForm.controls;
  }

  onSubmit() {
    console.warn(this.loginForm);
  }
}
