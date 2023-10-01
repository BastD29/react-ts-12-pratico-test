import { combineReducers } from "redux";
import { formReducer } from "./form";

// import { authReducer } from "store/auth";
// import { userReducer } from "store/user";
// import { certificationFlowReducer } from "@store/certificationFlow";

export default combineReducers({
  // auth: authReducer,
  // user: userReducer,
  // certificationFlow: certificationFlowReducer,
  form: formReducer,
});
