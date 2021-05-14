import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private db: AngularFirestore,
    private uiservice: UIService,
    private store: Store<fromTraining.State>){}

  fetchAvailableExercises(){
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercices')
    .snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories'],
          }
        })
      })
    ).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        console.log('exercises: ', exercises);
    },
    () => {
      this.store.dispatch(new UI.StopLoading());
      this.uiservice.showSnackbar('Fetching exercises failed, please try again later',null,3000)
      this.exercisesChanged.next(null);
     }))
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  getRunningExercise(){
    return {...this.runningExercise};
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExercise,
      date:new Date(),
      state: 'completed'});
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number){
    this.addDataToDatabase({...this.runningExercise,
      duration: this.runningExercise.duration*(progress/100),
      calories: this.runningExercise.calories*(progress/100),
      date:new Date(),
      state: 'cancelled'});
    this.store.dispatch(new Training.StopTraining());
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSubs.push(this.db
    .collection('finishedExercices')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercises))
    }))
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercices').add(exercise)
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
