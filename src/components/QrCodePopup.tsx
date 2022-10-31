import {QRCode} from "react-qrcode-logo";
import Popup from "reactjs-popup";

export default function QrCodePopup({url, id}: {url:string, id:string}){
    function download(){
        console.log("ran")
        let canvas: HTMLCanvasElement | null = document.querySelector("#i" + id)
        let anchor = document.createElement("a")
        if (canvas == null) return
        anchor.href = canvas.toDataURL("image/png")
        anchor.download = "IMAGE.PNG"
    }

    return (
        <Popup
        trigger={<button>OPEN</button>}
        nested={true}
        >
            <div
            className={"border shadow-lg bg-white p-2 rounded"}>
                <QRCode
                    value={url}
                    ecLevel={"H"}
                    logoImage={"https://cdn.britannica.com/66/1166-004-E9B61A49.jpg"}
                    logoWidth={50}
                    logoOpacity={0.8}
                    removeQrCodeBehindLogo={false}
                    id={"i"+id}
                />
                <div className={"flex-row text-center bg-white "}>
                    <button
                        className={"mx-1 bg-blue-400 rounded py-1 px-2"}
                    >Copy</button>
                    <button
                        className={"mx-1 bg-blue-400 rounded py-1 px-2"}
                    >Download</button>
                </div>
            </div>
        </Popup>
    )
}