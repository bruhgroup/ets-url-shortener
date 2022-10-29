import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect} from "react";
import {auth} from "../App";
import SiteLogo from "../assets/SiteLogo";
import Authentication from "../components/Authentication";
import Dashboard from "./Dashboard";
import {isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.min.css';
import Landing from "../components/Landing";

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading || user) return;

        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email ?? "", window.location.href)
                .then((result) => {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // Hacky: create a fake window so that we're able to close the tab.
                    window.open("about:blank", "_self");
                    window.close();
                })
                .catch((error) => {
                    // TODO: Show popup if error
                });
        }
    }, [loading, navigate, user])

    if (loading) return <></>

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
