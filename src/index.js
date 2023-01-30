import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from "react-router-dom";
// import { FirebaseAppProvider } from "reactfire";
// import { firebaseConfig } from "./Components/Firebase/Firebase";
import { Provider } from "react-redux";
import {Store,persistor} from "./Components/store/store";
// import { FirebaseAppProvider } from "reactfire";
// import { firebaseConfig } from "./Components/Firebase/Firebase";
import {PersistGate} from "redux-persist/integration/react"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}> */}
         <PersistGate loading = {<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PersistGate >
      {/* </FirebaseAppProvider> */}
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();