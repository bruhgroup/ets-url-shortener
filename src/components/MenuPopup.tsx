import Popup from "reactjs-popup";
import SettingIcon from "../assets/SettingIcon";
import {removeData} from "../Database";

export default function MenuPopup({userid, element, setEditing}: {userid: string | undefined, element: string, setEditing: React.Dispatch<React.SetStateAction<boolean>>}){

    return (
        <Popup
            trigger={open => (
                <button className="p-4"><SettingIcon/></button>
            )}
            offsetX={-20}
            arrowStyle={{ color: "rgb(150,150,150)" }}
            contentStyle={{}}
            arrow={false}
            position="left top"
            closeOnDocumentClick>

            <span
            className={"bg-white rounded p-2 flex flex-col shadow "}>
            <button
                onClick={() => setEditing(true)}>Edit
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



