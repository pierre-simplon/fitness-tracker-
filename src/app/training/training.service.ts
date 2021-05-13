import { Injectable } from "@angular/core";
import { Exercise } from "./exercice.model";
import { Subject } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import * as fromTraining from './training.reducer';
import { Store } from "@ngrx/store";
import { TrainingRoutingModule } from "./training-routing.module";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercices: Exercise[] = [];
  private runningExcercice: Exercise;
  private fbSubs: Subscription[] = [];

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore,
    private uiservice: UIService,
    private store: Store<fromTraining.State> ){}

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
    ).subscribe((exercices: Exercise[]) => {
           this.store.dispatch(new Training.SetAvailableTrainings(exercices))
           this.store.dispatch(new UI.StopLoading());
    },
    () => {
      this.store.dispatch(new UI.StopLoading());
      this.uiservice.showSnackbar('Fetching exercices failed, please try again later',null,3000)
      this.exercisesChanged.next(null);
     }))
  }

  startExercice(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  getRunningExercise(){
    return {...this.runningExcercice};
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExcercice,
      date:new Date(),
      state: 'completed'});
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number){
    this.addDataToDatabase({...this.runningExcercice,
      duration: this.runningExcercice.duration*(progress/100),
      calories: this.runningExcercice.calories*(progress/100),
      date:new Date(),
      state: 'cancelled'});
      this.store.dispatch(new Training.StopTraining());
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercices: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercices))
    }))
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise)
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
