import { Component,  OnDestroy,  OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

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
     ) { }

  ngOnInit(): void {
   this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000
    this.timer = window.setInterval(()=> {
      this.progress = this.progress + 5
      if (this.progress >=100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },step)
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
