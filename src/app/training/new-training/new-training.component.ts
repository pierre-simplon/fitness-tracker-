import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercice.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  exercices: Exercise[];
  exercicesSubscription: Subscription;

  constructor(
    private trainingService: TrainingService) {  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exercicesSubscription = this.trainingService.exercisesChanged.subscribe(exercices => this.exercices = exercices);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercise);
  }

  ngOnDestroy(){
    this.exercicesSubscription.unsubscribe();
  }
}
