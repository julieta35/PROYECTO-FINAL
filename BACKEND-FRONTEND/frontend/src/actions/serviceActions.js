import axios from "axios";

import {
  GET_ERRORS,
  SET_CURRENT_SERVICES,
  SET_CURRENT_MY_SERVICES
} from "./types";


export const createService = (serviceData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/services/create", serviceData)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'ocurrio un error' }
      })
    );
};

export const deleteService = (_id, history) => dispatch => {
  axios
    .post(`http://localhost:5000/api/services/delete/${_id}`)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'ocurrio un error' }
      })
    );
}

export const getAllServices = (Category) => dispatch => {
  axios
    .get("http://localhost:5000/api/services/all", { params: { Category : Category } } )
    .then(res => {
      dispatch(setCurrentServices(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'error' }
      })
    );
};

export const getMyServices = (User) => dispatch => {
  axios
    .get("http://localhost:5000/api/services/me", { params: { User : User } } )
    .then(res => {
      dispatch(setCurrentMyServices(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'error' }
      })
    );
};

export  const setCurrentMyServices = decoded => {
  return {
    type: SET_CURRENT_MY_SERVICES,
    payload: decoded
  };
}
// Set catgeiries in satte
export const setCurrentServices = decoded => {
  return {
    type: SET_CURRENT_SERVICES,
    payload: decoded
  };
};