import {
  ANSWERBLOCK,
  LOADING,
  QUESTIONS,
  QUESTIONPAGE,
  FILES,
  FAILED,
  PASSED,
  STOPS
} from "../types/quest.type";

const initailState = {
  loading: true,
  questions: [],
  questionPage: 0,
  file: {},
  failed: 0,
  passed: 0,
  time: 0,
  finishedIn: 0,
  done: false,
  answerBlock: [],
  stops: []
};

export const questionReducer = (state = initailState, action) => {
  switch (action.type) {
    case ANSWERBLOCK:
      return {
        ...state,
        answerBlock: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case QUESTIONPAGE:
      return {
        ...state,
        questionPage: action.payload
      };
    case FILES:
      return {
        ...state,
        file: action.payload
      };
    case FAILED:
      return {
        ...state,
        failed: action.payload
      };
    case PASSED:
      return {
        ...state,
        passed: action.payload
      };
    case STOPS:
      return {
        ...state,
        stops: action.payload
      };
    default:
      return { ...state };
  }
};
