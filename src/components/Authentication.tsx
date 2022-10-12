import React, {useState} from 'react';
import {auth} from "../App";
import {useAuthState, useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export default function Authentication() {
    const [user, loading, error] = useAuthState(auth);
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (loading) {
        return <p>loading auth state...</p>;
    }
    if (user) {
        return <><p>u signed in as {user.email}</p><Logout/></>
    }
    return ( <><Create/></>)
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
            <label htmlFor="email">email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">password</label>
            <input
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

}

function Logout() {
    return (<button onClick={() => signOut(auth)}>Logout</button>)
}