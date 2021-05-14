import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromTraining from './training.reducer'
import { Store } from '@ngrx/store';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(
    private store: Store<fromTraining.State>,
    private trainingService: TrainingService,
    ) { }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
