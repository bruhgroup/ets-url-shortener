import {database} from "./App";
import {ref, set, get, child} from "firebase/database";

function write(userid: string, url: string, surl: string) {
    set(ref(database, "links/" + userid), {
        url, short_url: surl,
    }).then(() => console.log("success")).catch(console.error)
}

function read(userid: string) {
    // todo use onValue
    get(child(ref(database), `links/${userid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("no data :(");
        }
    }).catch(console.error)
}

export {write, read};