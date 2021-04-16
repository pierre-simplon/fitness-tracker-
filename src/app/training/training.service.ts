import { Injectable } from "@angular/core";
import { Exercise } from "./exercice.model";

@Injectable()
export class TrainingService {
  private availableExercices: Exercise[] = [
    {id: 'crunch', name: 'Crunches', duration: 30, calories: 200},
    {id: 'planck', name: 'Planck', duration: 20, calories: 150},
    {id: 'push-up', name: 'Push-up', duration: 15, calories: 175},
    {id: 'burpees', name: 'Burpees', duration: 23, calories: 250},
  ];

  getAvailableExercises(){
    return this.availableExercices.slice()
  }
}
