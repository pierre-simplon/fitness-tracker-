import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Exercise } from 'src/app/training/exercise.model';
import { TrainingService } from 'src/app/training/training.service';
import * as fromTraining from '../../training/training.reducer'

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

  editingExercise: Exercise;
  newExerciseToSave: Exercise;

  constructor(
    private store: Store<fromTraining.State>,
    private trainingService: TrainingService,
  ) { }

  ngOnInit(): void {
    this.getEditingTraining();
  }

  onSubmit(): void {
    this.newExerciseToSave.name = this.exerciseForm.value.name;
    this.newExerciseToSave.calories = this.exerciseForm.value.calories;
    this.newExerciseToSave.duration = this.exerciseForm.value.duration;
    this.newExerciseToSave.id = this.editingExercise.id;
    console.log('Exercise to save: ', this.newExerciseToSave);
    this.trainingService.updateDatabaseWith(this.newExerciseToSave);
  }

  getEditingTraining() {
    this.store.select(fromTraining.getEditingTraining).pipe(take(1)).subscribe(exercise => {
      this.editingExercise = exercise
    });
  }
}
