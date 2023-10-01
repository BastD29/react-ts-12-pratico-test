import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./style/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore /* , { persistor } */ from "./store/configureStore.ts";
// import { PersistGate } from "redux-persist/integration/react";
// import { Loader } from "./components/shared/Loader/Loader.tsx";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
