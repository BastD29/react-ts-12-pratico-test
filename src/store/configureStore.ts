import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage";

import reducer from "./reducer";
import rootSaga from "./sagas";
// import { transforms } from "./transforms";

const sagaMiddleware = createSagaMiddleware();

// const persistConfig: any = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// if (import.meta.env.VITE_ENVIRONMENT === "production")
//   persistConfig.transforms = transforms;

// const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  // reducer: persistedReducer,
  reducer: reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const instance = () => store;
export default instance;

// const persistor = persistStore(store)
// export { persistor }
