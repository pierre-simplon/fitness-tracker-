import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercice.model';
import { UIService } from 'src/app/shared/ui.service';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  destroyed$ = new ReplaySubject(1);
  private exercicesSubscription: Subscription;

  constructor(
    private uiservice: UIService,
    private trainingService: TrainingService,
    private store: Store,
    ) {  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercicesSubscription = this.trainingService.exercisesChanged
    .pipe(takeUntil(this.destroyed$))
    .subscribe(exercices => this.exercises = exercices);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercise);
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
