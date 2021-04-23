import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercices: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore) {

  }

  ngOnInit(): void {
    this.exercices = this.db.collection('availableExercices').valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercise);
  }
}
