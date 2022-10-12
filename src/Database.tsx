import {auth, database} from "./App";
import {ref, get, child, update} from "firebase/database";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export function write(userid: string, url: string, surl: string) {
    const updates: { [index: string]: string|boolean } = {};
    updates[`/links/${surl}`] = url;
    updates[`/users/${userid}/urls/${surl}`] = true;
    return update(ref(database),updates);
}

export function read(userid: string) {
    // todo use onValue
    get(child(ref(database), `links/${userid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("no data :(");
        }
    }).catch(console.error)
}

export function load() {

}

export function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({errorCode, errorMessage})
            // ..
        });
}

export function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({errorCode, errorMessage})
        });
}