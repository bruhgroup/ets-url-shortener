import React from 'react';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";

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
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={"/*"} element={<Redirect/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
