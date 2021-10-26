import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {GroupComponent} from "../group_component/GroupComponent";
import {NotificationComponent} from "../notification_component/NotificationComponent";
import {groupServices} from '../../services';


export const GroupsComponent = () => {
    const [groups, setGroups] = useState(null);
    const [options, setOptions] = useState(null);

    const fetchGroups = async () => {
        const groupData = await groupServices.getAllGroups();
        sortGroupsById(groupData);
        return groupData;
    }

    const sortGroupsById = (arr) => {
        arr.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    const onGroupDelete = async (groupId) => {
        const status = await groupServices.deleteGroup(groupId);
        setGroups(await fetchGroups());

        if (status === 204) {
            setOptions({messageText: "Group successfully deleted.", type: "show custom-btn-success"});
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
        setGroups(await fetchGroups());
    }, [])

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            <div className="d-flex justify-content-end">
                <Link to={'/groups/add'}>
                    <button type="button" className="btn btn-outline-primary my-2">Add Group</button>
                </Link>
            </div>
            <hr className="my-0"/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Id</th>
                    <th scope="col" className="text-center">Name</th>
                    <th scope="col" className="text-center">Description</th>
                    <th scope="col" className="text-center">Users</th>
                    <th scope="col" className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {groups && groups.map(group => <GroupComponent group={group} key={group.id}
                                                               onGroupDelete={onGroupDelete}/>)}
                </tbody>
            </table>
        </div>
    )
};
