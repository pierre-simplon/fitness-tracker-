
import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, START_EDIT_TRAINING, STOP_EDIT_TRAINING, START_REMOVE_TRAINING, STOP_REMOVE_TRAINING } from "./training.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";


export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise,
  editingTraining: Exercise,
  removingTraining: Exercise,
}

export interface State extends fromRoot.State {
  training: TrainingState,
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
  editingTraining: null,
  removingTraining: null,
}

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    case START_EDIT_TRAINING:
      return {
        ...state,
        editingTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_EDIT_TRAINING:
      return {
        ...state,
        editingTraining: null
      }
    case START_REMOVE_TRAINING:
      return {
        ...state,
        removingTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_REMOVE_TRAINING:
      return {
        ...state,
        removingTraining: null
      }
    default: {
      return state
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);

export const getActiveTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getEditingTraining = createSelector(getTrainingState, (state: TrainingState) => state.editingTraining);
export const getRemovingTraining = createSelector(getTrainingState, (state: TrainingState) => state.removingTraining);

export const getFinishedExercise = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);

export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
export const getIsEditing = createSelector(getTrainingState, (state: TrainingState) => state.editingTraining != null);
