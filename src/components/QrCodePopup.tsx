import {QRCode} from "react-qrcode-logo";
import Popup from "reactjs-popup";

export default function QrCodePopup({url, id}: {url:string, id:string}){
    function download(){
        let canvas: HTMLCanvasElement | null = document.querySelector("#i" + id)
        let anchor = document.createElement("a")
        if (canvas == null) return
        console.log("Downloading png")
        anchor.href = canvas.toDataURL("image/png")
        anchor.download = `${id}.PNG`
        anchor.click()
    }
    async function copy() {
        let canvas: HTMLCanvasElement | null = document.querySelector("#i" + id)
        if (canvas == null) return
        const blob = await imageToBlob(canvas)
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
    }

    function imageToBlob(canvas:HTMLCanvasElement) {
        return new Promise<Blob>(resolve => {
                canvas.toBlob((blob) => {
                    // here the image is a blob
                    if (blob == null) return;
                    resolve(blob)
                }, "image/png", 0.75);
        })
    }

    return (
        <Popup
        trigger={<button>OPEN</button>}
        nested={true}
        >
            <div
            className={"border shadow-lg bg-white p-2 rounded"}>
                <QRCode
                    enableCORS={true}
                    value={url}
                    ecLevel={"H"}
                    id={"i"+id}
                />
                <div className={"flex-row text-center bg-white "}>
                    <button
                        className={"mx-1 bg-blue-400 rounded py-1 px-2"}
                        onClick={()=> copy()}
                    >Copy</button>
                    <button
                        className={"mx-1 bg-blue-400 rounded py-1 px-2"}
                        onClick={() => download()}
                    >Download</button>
                </div>
            </div>
        </Popup>
    )
}