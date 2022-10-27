import Popup from "reactjs-popup";
import SettingIcon from "../assets/SettingIcon";
import {removeData} from "../Database";

export default function MenuPopup({userid, element}: {userid: string | undefined, element: string}){

    return (
        <Popup
            trigger={open => (
                <button className="p-4"><SettingIcon/></button>
            )}
            offsetX={-20}
            arrowStyle={{color: "rgb(229 231 235)", border: "1px"}}
            contentStyle={{}}
            arrow={true}
            position="left top"
            closeOnDocumentClick>
        <span
            className={"bg-gray-200 rounded p-2 flex flex-col shadow "}>
            <button
                onClick={() => console.log("edited")}>Edit
                <hr className={"border-gray-300"}/>
            </button>
            <button
            onClick={() => removeData(userid, element)}
            >Delete
                <hr className={"border-gray-300"}/>
            </button>
            <button>Option</button>
        </span>
    </Popup>
    )
}



