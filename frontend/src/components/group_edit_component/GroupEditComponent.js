import React, {useEffect, useState} from "react";
import {groupServices} from "../../services";
import {withRouter} from "react-router-dom";
import {NotificationComponent} from "../notification_component/NotificationComponent";


export const GroupEditComponent = withRouter((props) => {
    const [group, setGroup] = useState(null);
    const {match: {params: {id: groupId}}} = props;
    const [options, setOptions] = useState(null);

    const saveChanges = async (event) => {
        event.preventDefault();

        let data = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value
        }
        const status = await groupServices.updateGroup(groupId, data);

        if (status === 200) {
            setOptions({messageText: "Group successfully edited.", type: "show custom-btn-success"});
        } else if (status === 400) {
            setOptions({messageText: "Something goes wrong.", type: "show custom-btn-danger"});
        } else if (status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }

    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    useEffect(async () => {
        const groupData = await groupServices.getGroupById(groupId);
        setGroup(groupData);
    }, [])

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            {group && <div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success my-2" form="editform">Save Group</button>
                </div>
                <hr className="my-0"/>
                <form id="editform" className="mt-3" onSubmit={saveChanges}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" defaultValue={group.name} className="form-control" id="name"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input type="text" defaultValue={group.description} className="form-control"
                                   id="description"/>
                        </div>
                    </div>
                </form>
            </div>}
        </div>
    )
});


