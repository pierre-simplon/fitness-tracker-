import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from 'src/app/training/training.service';
import * as fromTraining from '../../training/training.reducer'
import * as Training from '../../training/training.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-remove-training',
  templateUrl: './remove-training.component.html',
  styleUrls: ['./remove-training.component.css']
})
export class RemoveTrainingComponent implements OnInit {


  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,) { }

  ngOnInit(): void {
  }

  deleteExercise(){
    this.store.select(fromTraining.getRemovingTraining).pipe(take(1)).subscribe(ex =>{
      this.store.dispatch(new Training.StartRemoveTraining(ex.id));
      console.log('exercise to remove: ', JSON.stringify(ex));
      this.trainingService.removeExerciseFromDatabase(ex)
    });
    this.store.dispatch(new Training.StopRemoveTraining());
  }
}
