import Popup from "reactjs-popup";
import SettingIcon from "../assets/SettingIcon";
import {removeData} from "../Database";
import React from "react";

export default function MenuPopup({
                                      userid,
                                      element,
                                      setEditing,
                                      setEditIndex,
                                      index
                                  }: { userid: string | undefined, element: string, setEditing: React.Dispatch<React.SetStateAction<boolean>>, setEditIndex: any, index: number }) {
    return (
        <Popup
            trigger={() => (<button className="p-4"><SettingIcon/></button>)}
            offsetX={-20}
            arrowStyle={{color: "rgb(150,150,150)"}}
            arrow={false}
            position="left top"
            closeOnDocumentClick>
            <div className={"bg-white rounded p-2 flex flex-col shadow"}>
                <button onClick={() => {
                    setEditing(true);
                    setEditIndex(index);
                }}>Edit
                </button>
                <hr className={"border-gray-300"}/>
                <button onClick={() => removeData(userid, element)}>
                    Delete
                </button>
                <hr className={"border-gray-300"}/>
                <button>Option</button>
            </div>
        </Popup>
    )
}



