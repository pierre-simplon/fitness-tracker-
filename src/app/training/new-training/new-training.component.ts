import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercice.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  exercices: Exercise[];
  isLoading = true;
  private exercicesSubscription: Subscription;
  private loadingSubscription: Subscription

  constructor(
    private uiservice: UIService,
    private trainingService: TrainingService,
    ) {  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiservice.loadingStateChanged.subscribe(
      isLoading => {this.isLoading = isLoading;}
    )
    this.trainingService.fetchAvailableExercises();
    this.exercicesSubscription = this.trainingService.exercisesChanged.subscribe(exercices => this.exercices = exercices);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercise);
  }

  ngOnDestroy(){
    this.exercicesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe()
  }
}
