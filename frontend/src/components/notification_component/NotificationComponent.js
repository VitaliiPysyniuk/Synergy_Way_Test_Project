import React from "react";
import './NotificationComponent.css'

export const NotificationComponent = ({messageText, type, onNotificationClose}) => {
    const onButtonClick = () => {
        const toastMessage = document.getElementById("toast-message");
        toastMessage.className = toastMessage.className.replace('show', '');
        onNotificationClose()
    }

    return (
        <div className="d-flex justify-content-end">
            <div className={"toast align-items-center mt-2" + " " + type} role="alert" aria-live="assertive"
                 aria-atomic="true" id="toast-message">
                <div className="d-flex">
                    <div className="toast-body">
                        {messageText}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close" onClick={onButtonClick}></button>
                </div>
            </div>
        </div>
    )
}
