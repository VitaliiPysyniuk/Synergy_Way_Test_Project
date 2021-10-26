import React, {useEffect, useState} from "react";
import {groupServices, userServices} from "../../services";
import {NotificationComponent} from "../notification_component/NotificationComponent";

export const UserAddComponent = () => {
    const [groups, setGroups] = useState([])
    const [options, setOptions] = useState(null);


    const saveChanges = async (event) => {
        event.preventDefault();
        let groupsInputVal = event.target.elements.groups.value

        let data = {
            username: event.target.elements.username.value
        }

        if (groupsInputVal !== "") {
            groupsInputVal = groupsInputVal.split(' ').join('')
            groupsInputVal = groupsInputVal.split(',')
                .filter((v, i, a) => a.indexOf(v) === i)
            groupsInputVal = groupsInputVal.join(',')

            const groupNames = groups.map(group => group.name);

            data.groups = groupsInputVal.split(",")
                .map(groupName => {
                    let index = groupNames.indexOf(groupName);
                    return {group: {id: groups[index].id}}
                })
        }

        console.log(data);
        console.log(data.groups);

        const status = await userServices.addUser(data)

        if (status === 201) {
            setOptions({messageText: "User successfully added.", type: "show custom-btn-success"});
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
        const groupsData = await groupServices.getAllGroups();
        setGroups(groupsData);
    }, [])

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success my-2" form="editform">Save User</button>
            </div>
            <hr className="my-0"/>
            <form id="editform" className="mt-3" onSubmit={saveChanges}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" placeholder="User name" className="form-control" id="username"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Groups</label>
                    <div className="col-sm-10">
                        <input type="text" placeholder="Group1, Group2" className="form-control mb-3" id="groups"/>
                        <select className="form-select" multiple aria-label="multiple select example">
                            {groups.map(group => {
                                return (
                                    <option value={group.id} id={group.id}>
                                        Group: Id: {group.id} Name: {group.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
};


