import {
  actions as formActions,
  selectors as formSelectors,
  reducer as formReducer,
  sagaActions as formSagaActions,
} from "./slice";
import { formFlows as _formFlows, formSagas as _formSagas } from "./sagas";

const formSagas = [..._formSagas];
const formFlows = { ..._formFlows };

export {
  formFlows,
  formSagas,
  //
  formSagaActions,
  formActions,
  formSelectors,
  formReducer,
};
