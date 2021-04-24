import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercice.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,OnDestroy,AfterViewInit {

  displayedColumns = ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();

  private exerciseChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator)  paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data= exercises; }
    )
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter($event){
    this.dataSource.filter = $event.target.value.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.exerciseChangedSubscription.unsubscribe();
  }

}
