import React, {useState} from "react";
import {groupServices} from "../../services";
import {NotificationComponent} from "../notification_component/NotificationComponent";


export const GroupAddComponent = () => {
    const [options, setOptions] = useState(null);

    const saveChanges = async (event) => {
        event.preventDefault();

        let data = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value
        }
        const status = await groupServices.addGroup(data);

        if (status === 201) {
            setOptions({messageText: "Group successfully added.", type: "show custom-btn-success"});
        } else if (status === 400) {
            setOptions({messageText: "Something goes wrong.", type: "show custom-btn-danger"});
        } else if (status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }
    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success my-2" form="editform">Save Group</button>
            </div>
            <hr className="my-0"/>
            <form id="editform" className="mt-3" onSubmit={saveChanges}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description"/>
                    </div>
                </div>
            </form>
        </div>
    )
};


