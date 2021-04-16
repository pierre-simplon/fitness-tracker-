import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercice.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  trainingStart = new EventEmitter<void>();

  exercices: Exercise[] = [];

  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.exercices = this.trainingService.getAvailableExercises()
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
