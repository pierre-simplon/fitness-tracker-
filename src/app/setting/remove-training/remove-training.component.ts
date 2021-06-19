import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/training/exercise.model';
import { TrainingService } from 'src/app/training/training.service';

@Component({
  selector: 'app-remove-training',
  templateUrl: './remove-training.component.html',
  styleUrls: ['./remove-training.component.css']
})
export class RemoveTrainingComponent implements OnInit {


  constructor(
    private trainingService: TrainingService) { }

  ngOnInit(): void {
  }

  deleteExercise(){
     this.trainingService.RemoveTraining();
  }


}
