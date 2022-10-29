import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect, useState} from "react";
import {auth} from "../App";
import Authentication from "../components/Authentication";
import Dashboard from "./Dashboard";
import {isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Landing from "../components/Landing";

import 'react-toastify/dist/ReactToastify.min.css';

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState<boolean>(false)

    useEffect(() => {
        if (loading || user) return;

        if (isSignInWithEmailLink(auth, window.location.href)) {
            setSignIn(true);
            let email = window.localStorage.getItem('emailForSignIn');
            while (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // This creates a fake window, so that we're able to close it. (shouldn't do this though)
                    // TODO: Should be a success page instead, telling the user to go back to the other tab.
                    window.open("about:blank", "_self");
                    window.close();
                })
                .catch((error) => {
                    // TODO: Show popup if error
                });
        }
    }, [loading, navigate, user])

    if (loading || signIn) return <></>

    return (
        user ?
            <>
                <Dashboard/>
                <ToastContainer position="bottom-left" limit={3} theme="colored"/>
            </> :
            <>
                <Landing>
                    <Authentication/>
                </Landing>
                <ToastContainer position="bottom-center" limit={3} theme="colored"/>
            </>
    );
}

export default Home;
