import { Component,  OnDestroy,  OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit,OnDestroy {

  progress = 0;
  timer: number;
  destroyed$ = new ReplaySubject(1);
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit(): void {
   this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(
      ex => {
        const step = ex.duration / 100 * 1000;
        this.timer = window.setInterval(()=> {
          this.progress = this.progress + 5
          if (this.progress >=100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        },step)
      }
    )
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}})

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if (result){
        this.trainingService.cancelExercise(this.progress)
      }
      else {
        this.startOrResumeTimer()
      }
    });
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
