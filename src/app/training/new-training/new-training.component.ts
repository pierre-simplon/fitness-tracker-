import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReplaySubject, Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercice.model';
import { UIService } from 'src/app/shared/ui.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  destroyed$ = new ReplaySubject(1);
  private exercicesSubscription: Subscription;
  private loadingSubscription: Subscription

  constructor(
    private uiservice: UIService,
    private trainingService: TrainingService,
    ) {  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiservice.loadingStateChanged
    .pipe(takeUntil(this.destroyed$))
    .subscribe(
      isLoading => {this.isLoading = isLoading;}
    )
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
