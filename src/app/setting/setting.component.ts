import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainingService } from '../training/training.service';
import * as fromTraining from '../training/training.reducer'
import * as fromRoot from '../app.reducer'
import { NgForm } from '@angular/forms';
import { Exercise } from '../training/exercise.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    ) {  }


    ngOnInit(): void {
      this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
    }

    onEditTraining(form: NgForm) {
      this.trainingService.EditTraining(form.value.exercise);
    }

    fetchExercises(){
      this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
    }
}
