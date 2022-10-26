import React, {Dispatch, useEffect, useState} from 'react';
import {auth} from "../App";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import LoadingIcon from "../assets/LoadingIcon";

export default function Authentication() {
    const [register, setRegister] = useState<boolean>(false);

    // TODO: Move these into components
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

    useEffect(() => {
        if (error) alert(error.message)
    }, [error])

    if (user) {
        return <p>User created</p>
    }

    return (
        <div className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em]"}>
            <div className={"flex justify-center"}>
                <span className={"font-medium text-2xl mb-[24px]"}>Authentication</span>
            </div>
            <form
                className={"flex flex-col gap-4 m-auto max-w-full w-[22em]"}
                onSubmit={(e) => {
                    e.preventDefault();
                    createUserWithEmailAndPassword(email, password)
                }}
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
                    <button className={"text-white"} type={"submit"} disabled={loading}>
                        {loading ? <LoadingIcon/> : "Create Account"}
                    </button>
                </div>
            </form>
            <button className={"text-gray-500"} onClick={() => setRegister(false)}>Already have an account?</button>
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

    useEffect(() => {
        if (error) alert(error.message)
    }, [error])

    if (user) {
        return <p>User created</p>
    }

    return (
        <div className={"flex flex-col gap-4 bg-white p-8 justify-center rounded max-w-full w-[36em]"}>
            <div className={"flex justify-center"}>
                <span className={"font-medium text-2xl mb-[24px]"}>Authentication</span>
            </div>
            <form
                className={"flex flex-col gap-4 m-auto max-w-full w-[22em]"}
                onSubmit={(e) => {
                    e.preventDefault();
                    signInWithEmailAndPassword(email, password)
                }}
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
                    <button className={"text-white"} type={"submit"} disabled={loading}>
                        {loading ? <LoadingIcon/> : "Login"}
                    </button>
                </div>
            </form>
            <button className={"text-gray-500"} onClick={() => setRegister(true)}>Don't have an account?</button>
        </div>
    );
}

export function Logout() {
    return (<button className={"items-center text-white text-xl "} onClick={() => signOut(auth)}>Logout</button>)
}