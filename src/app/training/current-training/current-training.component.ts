import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  imagePath: string;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
    this.getExerciseImage();
  }

  startOrResumeTimer() {
    this.store
      .select(fromTraining.getActiveTrainings)
      .pipe(take(1))
      .subscribe((ex) => {
        const step = (ex.duration / 100) * 1000;
        this.timer = window.setInterval(() => {
          this.progress = this.progress + 5;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  getExerciseImage() {
    this.store
      .select(fromTraining.getActiveTrainings)
      .pipe(take(1))
      .subscribe((ex) => {
        this.imagePath = ex.imagePath;
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
