import { Injectable } from "@angular/core";
import { Exercise } from "./exercice.model";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercices: Exercise[] = [
    {id: 'crunch', name: 'Crunches', duration: 300, calories: 200},
    {id: 'planck', name: 'Planck', duration: 20, calories: 150},
    {id: 'push-up', name: 'Push-up', duration: 5, calories: 175},
    {id: 'burpees', name: 'Burpees', duration: 23, calories: 250},
  ];

  private runningExcercice: Exercise;
  private exercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise>();

  getAvailableExercises(){
    return this.availableExercices.slice()
  }

  startExercice(selectedId: string) {
    this.runningExcercice = this.availableExercices.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExcercice})
  }

  getRunningExercise(){
    return {...this.runningExcercice};
  }

  completeExercise(){
    this.exercises.push({...this.runningExcercice,
      date:new Date(),
      state: 'completed'});
    this.runningExcercice = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.exercises.push({...this.runningExcercice,
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
}
