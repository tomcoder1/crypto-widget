import { getCurrentWindow } from "@tauri-apps/api/window";


import "./../styles/TitleBar.css";

export default function TitleBar() {
    return (
        <div className="title-bar" data-tauri-drag-region>
            <div className="right-section" data-tauri-drag-region="false">
                <button className="btn btn-minimize" onClick={() => getCurrentWindow().minimize()}>
                    &minus;
                </button>
                <button className="btn btn-close" onClick={() => getCurrentWindow().close()}>
                    &times;
                </button>
            </div>
        </div>
    );
}