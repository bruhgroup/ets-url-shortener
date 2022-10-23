import React, {useState} from 'react';
import {auth} from "../App";
import {useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import {Navigate, Route} from "react-router-dom";
import home from "../pages/Home";
import Home from "../pages/Home";
import Switch from "./Switch";
import Redirect from "../pages/Redirect";


export default function Authentication({className}: {className: string}) {
    const [user, loading, error] = useAuthState(auth);
    if (error) {
        return <p className={className}>Error: {error.message}</p>;
    }
    if (loading) {
        return <p className={className}>loading auth state...</p>;
    }

    if (user) {
        return (
            <div>
                <Navigate to="/dashboard"/>
                <div className={"flex flex-row space-x-2"}><p >Signed in as {user.email}</p><Logout/></div>
            </div>
    )

    }
    return ( <div className={className}><Create/><Login/></div>)
}

function Create() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    if (error) {
        return (
            <p>Error: {error.message}</p>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <p>Registered User: {user.user.email}</p>
        );
    }
    return (
        <div className="App">
            <label htmlFor="email"> email </label>
            <input
                className={"border-2 border-solid border-black rounded"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">password </label>
            <input
                className={"border-2 border-solid border-black rounded"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => createUserWithEmailAndPassword(email, password)}>
                Register
            </button>
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (error) {
        return (
            <p>Error: {error.message}</p>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
            <p>signed in user: {user.user.email}</p>
        );
    }
    return (
        <div className="App">
            <label htmlFor="email">email </label>
            <input
                className={"border-2 border-solid border-black rounded"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password"> password </label>
            <input
                className={"border-2 border-solid border-black rounded"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => signInWithEmailAndPassword(email, password)}>
                 Log in
            </button>
        </div>
    );
}

export function Logout() {
    return (<button className={"items-center text-white text-xl "} onClick={() => signOut(auth)}>Logout</button>)
}