import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-set-training',
  templateUrl: './set-training.component.html',
  styleUrls: ['./set-training.component.css']
})
export class SetTrainingComponent implements OnInit {
  exerciseForm = new FormGroup({
    name: new FormControl(''),
    duration: new FormControl(''),
    calories: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.exerciseForm.value);
  }
}
