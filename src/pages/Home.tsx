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
                    window.open("about:blank", "_self");
                    window.close();
                })
                .catch((error) => {
                    // TODO: Show popup if error
                });
        }
    }, [loading, navigate, user])

    if (!loading) {
        return (
            <>
                {user ?
                    <Dashboard/> :
                    <div className={"bg-c-gray-100 h-screen"}>
                        <div className={"max-w-screen-md h-full m-auto py-[32px] px-[8px] flex flex-col gap-2"}>
                            <div className={"flex justify-center items-center"}>
                                <SiteLogo color={"black"}/>
                            </div>
                            <div className={"flex flex-grow justify-center items-center"}>
                                <Authentication/>
                            </div>
                            <div className={"flex justify-center items-center"}>
                                <SiteLogo color={"black"}/>
                            </div>
                        </div>
                    </div>
                }
                <ToastContainer position="bottom-right" limit={3} theme="colored"/>
            </>
        );
    }

    return <></>
}

export default Home;
