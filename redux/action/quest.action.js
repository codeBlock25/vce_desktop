import {
  ANSWERBLOCK,
  LOADING,
  QUESTIONS,
  QUESTIONPAGE,
  FILES,
  PASSED,
  TIME,
  STOPS,
  FILE
} from "../types/quest.type";

export const AnswerAction = payload => {
  return {
    type: ANSWERBLOCK,
    payload: payload
  };
};
export const loadingAction = payload => {
  return {
    type: LOADING,
    payload: payload
  };
};
export const questionsAction = payload => {
  return {
    type: QUESTIONS,
    payload: payload
  };
};
export const questionPageAction = payload => {
  return {
    type: QUESTIONPAGE,
    payload: payload
  };
};
export const filesAction = payload => {
  return {
    type: FILES,
    payload: payload
  };
};
export const passedAction = payload => {
  return {
    type: PASSED,
    payload: payload
  };
};
export const timeAction = payload => {
  return {
    type: TIME,
    payload: payload
  };
};
export const stopsAction = payload => {
  return {
    type: STOPS,
    payload: payload
  };
};
export const fileAction = payload => {
  return {
    type: FILE,
    payload: payload
  };
};
