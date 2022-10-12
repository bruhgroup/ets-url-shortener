import React from 'react';
import './App.css';

import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {createUser, read, write} from "./Database";
import Authentication from "./components/Authentication";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBmSG0ulPPy-A2SgAELbwF-f467doKJiw4",
    authDomain: "ets-url-shortener.firebaseapp.com",
    projectId: "ets-url-shortener",
    storageBucket: "ets-url-shortener.appspot.com",
    databaseURL: "https://ets-url-shortener-default-rtdb.firebaseio.com/",
    messagingSenderId: "44963408642",
    appId: "1:44963408642:web:83caa24a0d7c31052b301b",
    measurementId: "G-LKSEDM1380"
};

export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const database = getDatabase(firebase);
export const auth = getAuth(firebase);

function App() {
    return (
        <div className="App">
            <button type={"submit"} onClick={() => write("5", "mmmmm", "ummmy")}>write
            </button>
            <button type={"submit"} onClick={() => read("ummmy")}>read</button>

            <Authentication/>

        </div>
    );
}

export default App;
