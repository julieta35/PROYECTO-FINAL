import axios from "axios";

import {
  GET_ERRORS,
  SET_CURRENT_CATEGORIES,
} from "./types";


export const createCategory = (categoryData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/categories/create", categoryData)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'ocurrio un error' }
      })
    );
};

export const deleteCategory = (_id, history) => dispatch => {
  axios
    .post(`http://localhost:5000/api/categories/delete/${_id}`)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'ocurrio un error' }
      })
    );
};

export const getAllCategories = () => dispatch => {
  axios
    .get("http://localhost:5000/api/categories/all")
    .then(res => {
      console.log(res)
      dispatch(setCurrentCategories(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'error' }
      })
    );
};
// Set catgeiries in satte
export const setCurrentCategories = decoded => {
  return {
    type: SET_CURRENT_CATEGORIES,
    payload: decoded
  };
};


