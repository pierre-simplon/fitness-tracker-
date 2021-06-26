import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Exercises';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Exercises';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';
export const START_EDIT_TRAINING = '[Training] Start Edit Training';
export const STOP_EDIT_TRAINING = '[Training] Stop Edit Training';
export const START_REMOVE_TRAINING = '[Training] Start Remove Training';
export const STOP_REMOVE_TRAINING = '[Training] Stop Remove Training';
export const START_ADD_TRAINING = '[Training] Start Add Training';
export const STOP_ADD_TRAINING = '[Training] Stop Add Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(
    public payload: Exercise[]
  ) { }
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(
    public payload: Exercise[]
  ) { }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(
    public payload: string
  ) { }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING
}

export class StartEditTraining implements Action {
  readonly type = START_EDIT_TRAINING;
  constructor(
    public payload: string
  ) { }
}


export class StopEditTraining implements Action {
  readonly type = STOP_EDIT_TRAINING;
}

export class StartRemoveTraining implements Action {
  readonly type = START_REMOVE_TRAINING;
  constructor(
    public payload: string
  ) { }
}


export class StopRemoveTraining implements Action {
  readonly type = STOP_REMOVE_TRAINING;
}

export class StartAddTraining implements Action {
  readonly type = START_ADD_TRAINING;
  constructor(
    public payload: string
  ) { }
}


export class StopAddTraining implements Action {
  readonly type = STOP_ADD_TRAINING;
}




export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining | StartEditTraining | StopEditTraining | StartRemoveTraining | StopRemoveTraining | StartAddTraining |StopAddTraining;
