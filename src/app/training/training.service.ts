import { Injectable } from "@angular/core";
import { Exercise } from "./exercice.model";
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercices: Exercise[] = [
    {id: 'crunch', name: 'Crunches', duration: 30, calories: 200},
    {id: 'planck', name: 'Planck', duration: 20, calories: 150},
    {id: 'push-up', name: 'Push-up', duration: 15, calories: 175},
    {id: 'burpees', name: 'Burpees', duration: 23, calories: 250},
  ];

  private runningExcercice: Exercise;

  exerciseChanged = new Subject<Exercise>()

  getAvailableExercises(){
    return this.availableExercices.slice()
  }

  startExercice(selectedId: string) {
    this.runningExcercice = this.availableExercices.find(ex => ex.id = selectedId);
    this.exerciseChanged.next({...this.runningExcercice})
  }
}
