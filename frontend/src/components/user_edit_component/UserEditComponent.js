import React, {useEffect, useReducer, useState} from "react";
import {groupServices, userServices} from "../../services";
import {withRouter} from "react-router-dom";
import {NotificationComponent} from "../notification_component/NotificationComponent";


const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_AND_GROUPS_ID": {
            return {
                ...state,
                user: action.payload.user,
                userGroupsNames: action.payload.userGroupsNames
            };
        }
        case "SET_GROUPS": {
            return {
                ...state,
                groups: action.payload.groups
            };
        }
        default: {
            console.error(`didn't found case for action:`, action);
            return state;
        }
    }
};

const initialState = {
    user: null,
    userGroupsNames: [],
    groups: [],
};


export const UserEditComponent = withRouter((props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [options, setOptions] = useState(null);
    const {match: {params: {id: userId}}} = props;

    const saveChanges = async (event) => {
        event.preventDefault();
        const groupsInputVal = event.target.elements.groups.value.replace(" ", "")

        let data = {
            username: event.target.elements.username.value
        }

        if (groupsInputVal !== "") {
            const groupNames = state.groups.map(group => group.name);

            data.groups = groupsInputVal.split(",")
                .map(groupName => {
                    let index = groupNames.indexOf(groupName);
                    return {group: {id: state.groups[index].id}}
            })
        }

        const status = await userServices.updateUser(state.user.id, data);

        if (status === 200) {
            setOptions({messageText: "User successfully edited.", type: "show custom-btn-success"});
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
        dispatch({type: "SET_GROUPS", payload: {groups: groupsData}});


        const userData = await userServices.getUserById(userId);
        dispatch({
            type: "SET_USER_AND_GROUPS_ID",
            payload: {user: userData, userGroupsNames: userData.groups.map(group => group.group.name)}
        });

    }, [])

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            {state.user && <div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success my-2" form="editform">Save User</button>
                </div>
                <hr className="my-0"/>
                <form id="editform" className="mt-3" onSubmit={saveChanges}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" defaultValue={state.user.username} className="form-control"
                                   id="username"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Groups</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder={"Group1, Group2"} defaultValue={state.userGroupsNames}
                                   className="form-control mb-3" id="groups"/>
                            <select className="form-select" multiple aria-label="multiple select example">
                                {state.groups.map(group => {
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
            </div>}
        </div>
    )
});


