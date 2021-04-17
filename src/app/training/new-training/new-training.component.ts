import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercice.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercices: Exercise[] = [];

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.exercices = this.trainingService.getAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercise);
  }
}
