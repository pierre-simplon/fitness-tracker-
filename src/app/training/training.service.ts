import { Injectable } from "@angular/core";
import { Exercise } from "./exercice.model";
import { Subject } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercices: Exercise[] = [];
  private runningExcercice: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore){}
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  fetchAvailableExercises(){
    this.db.collection('availableExercices')
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
           this.availableExercices = exercices;
           this.exercisesChanged.next([...this.availableExercices]);
    })
  }

  startExercice(selectedId: string) {
    this.runningExcercice = this.availableExercices.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExcercice})
  }

  getRunningExercise(){
    return {...this.runningExcercice};
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExcercice,
      date:new Date(),
      state: 'completed'});
    this.runningExcercice = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.addDataToDatabase({...this.runningExcercice,
      duration: this.runningExcercice.duration*(progress/100),
      calories: this.runningExcercice.calories*(progress/100),
      date:new Date(),
      state: 'cancelled'});
    this.runningExcercice = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise)
  }
}
