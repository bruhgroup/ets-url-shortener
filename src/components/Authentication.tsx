import React, {Dispatch, useState} from 'react';
import {auth} from "../App";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import {Navigate} from "react-router-dom";

export default function Authentication() {
    const [user, loading, error] = useAuthState(auth);
    const [register, setRegister] = useState<boolean>(false);

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (loading) {
        return <p>loading auth state...</p>;
    }

    if (user) {
        return (<Navigate to="/dashboard"/>)
    }

    return (
        register ?
            <Create setRegister={setRegister}/> :
            <Login setRegister={setRegister}/>
    )
}

function Create({setRegister}: { setRegister: Dispatch<boolean> }) {
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
            <button onClick={() => setRegister(false)}>Already have an account? Log in.</button>
        </div>
    );
}

function Login({setRegister}: { setRegister: Dispatch<boolean> }) {
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
        <div className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em]"}>
            <div className={"flex justify-center"}>
                <span className={"font-medium text-2xl mb-[24px]"}>Authentication</span>
            </div>
            <form
                className={"flex flex-col gap-4 m-auto w-[22em]"}
                onSubmit={() => signInWithEmailAndPassword(email, password)}
            >
                <label htmlFor={"email"}>Email</label>
                <input
                    id={"email"}
                    className={"flex p-2 border-2 border-c-gray-300 rounded"}
                    placeholder={"example@email.com"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type={"email"}
                />
                <label htmlFor={"password"}>Password</label>
                <input
                    id={"password"}
                    className={"flex p-2 border-2 border-c-gray-300 rounded"}
                    placeholder={"********"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={"password"}
                />
                <div className={"max-h-[45px] rounded px-[16px] py-[8px] bg-blue-500 font-medium w-full text-center"}>
                    <button className={"text-white"} type={"submit"}>Login</button>
                </div>
            </form>
            <button onClick={() => setRegister(true)}>Don't have an account?</button>
        </div>
    );
}

export function Logout() {
    return (<button className={"items-center text-white text-xl "} onClick={() => signOut(auth)}>Logout</button>)
}