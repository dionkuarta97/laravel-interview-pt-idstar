import { alertError, alertSuccess } from "../assets/js/sweetalert2";
import { SET_DOCUMENTS, SET_LOADING, SET_USER, SET_ERROR_MESSAGE, SET_LOGIN, SET_SUCCESS_MESSAGE } from "./actionTypes";

import axios from "./apis/serve";

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function setLogin(payload) {
  return {
    type: SET_LOGIN,
    payload,
  };
}

export function setErrorMessage(payload) {
  return {
    type: SET_ERROR_MESSAGE,
    payload,
  };
}
export function setSuccessMessage(payload) {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload,
  };
}
export function setDocuments(payload) {
  return {
    type: SET_DOCUMENTS,
    payload,
  };
}

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function getUser() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "/user",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function login(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: "/login",
        method: "POST",
        data: payload,
      });
      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
      alertSuccess("success to login");
      dispatch(setLoading(false));
      dispatch(setLogin(true));
    } catch (err) {
      alertError(err.response.data.message);
      console.log(err.response.data);
    }
  };
}

export function getDocuments(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let params;
      if (payload) params = payload;
      const { data } = await axios({
        url: "/documents",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params,
      });
      dispatch(setDocuments(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addDocument(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: "/documents",
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
      alertSuccess("success add data");
      dispatch(getDocuments());
      dispatch(setLoading(false));
    } catch (error) {
      alertError(error.response.data.message);
      console.log(error);
    }
  };
}

export function deleteDocument(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: "/documents/" + payload,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      alertSuccess("success delete data");
      dispatch(getDocuments());
      dispatch(setLoading(false));
    } catch (error) {
      alertError(error.response.data.message);
      console.log(error);
    }
  };
}

export function updateDocumet(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: "/documents/" + payload.id,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: { status: payload.status, remark: payload.remark },
      });
      alertSuccess("Success " + payload.status + " Data");
      dispatch(getDocuments({ status: "On Progress" }));
      dispatch(setLoading(false));
    } catch (error) {
      alertError(error.response.data.message);
      console.log(error);
    }
  };
}
