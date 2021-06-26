import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Exercise } from 'src/app/training/exercise.model';
import { TrainingService } from 'src/app/training/training.service';
import * as fromTraining from '../../training/training.reducer'
import * as Training from '../../training/training.actions';

@Component({
  selector: 'app-set-training',
  templateUrl: './set-training.component.html',
  styleUrls: ['./set-training.component.css']
})
export class SetTrainingComponent implements OnInit {
  editingExercise: Exercise;

  newExerciseToSave: Exercise = {
    id: '',
    name: '',
    calories: 1,
    duration: 1
  }
  exerciseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromTraining.State>,
    private trainingService: TrainingService,
  ) { }

  ngOnInit(): void {
    this.editingExercise = this.trainingService.getEditingTraining();
    this.exerciseForm = this.formBuilder.group({
      name: [this.editingExercise.name, [Validators.required]],
      duration: [this.editingExercise.duration, [Validators.required]],
      calories: [this.editingExercise.calories, Validators.required],
    })
  }

  onSubmit(): void {
    this.newExerciseToSave.name = this.exerciseForm.value.name;
    this.newExerciseToSave.calories = this.exerciseForm.value.calories;
    this.newExerciseToSave.duration = this.exerciseForm.value.duration;
    this.newExerciseToSave.id = this.editingExercise.id;
    this.trainingService.updateDatabaseWith(this.newExerciseToSave);
  }

  deleteExercise(){
      this.store.dispatch(new Training.StartRemoveTraining(this.editingExercise.id));
      this.trainingService.removeExerciseFromDatabase(this.editingExercise)
      this.store.dispatch(new Training.StopRemoveTraining());
  }

  addExercise(){
    this.store.dispatch(new Training.StartAddTraining(this.editingExercise.id));
    this.trainingService.addExerciseToDatabase(this.editingExercise);
    this.store.dispatch(new Training.StopAddTraining());
  }
}
