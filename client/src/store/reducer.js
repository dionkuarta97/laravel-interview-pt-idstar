import { SET_DOCUMENTS, SET_LOADING, SET_USER, SET_ERROR_MESSAGE, SET_LOGIN, SET_SUCCESS_MESSAGE } from "./actionTypes";

const initialState = {
  loading: false,
  user: {},
  documents: {},
  errorMessage: "",
  successMessage: "",
  login: false,
};

function reducer(state = initialState, action) {
  if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  } else if (action.type === SET_DOCUMENTS) {
    return { ...state, documents: action.payload };
  } else if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  } else if (action.type === SET_ERROR_MESSAGE) {
    return { ...state, errorMessage: action.payload };
  } else if (action.type === SET_LOGIN) {
    return { ...state, login: action.payload };
  } else if (action.type === SET_SUCCESS_MESSAGE) {
    return { ...state, successMessage: action.payload };
  }
  return state;
}

export default reducer;
