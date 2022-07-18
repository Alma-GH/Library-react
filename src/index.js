import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database"
import {DBContext} from "./context/DBContext";


const firebaseConfig = {
  apiKey: "AIzaSyDyg0IVxUt0Z6mmJsnJj-NUw5t0s3lOOQ0",
  authDomain: "mylib-e19e9.firebaseapp.com",
  databaseURL: "https://mylib-e19e9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mylib-e19e9",
  storageBucket: "mylib-e19e9.appspot.com",
  messagingSenderId: "68403622138",
  appId: "1:68403622138:web:b585347d13b2bfc8de5943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DBContext.Provider value={{auth,db}}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </DBContext.Provider>
  </Provider>
);
