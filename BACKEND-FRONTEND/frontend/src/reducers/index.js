import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from './categoryReducer'
import errorReducer from "./errorReducer";
import serviceReducer from "./serviceReducer"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  category: categoryReducer,
  service: serviceReducer
});