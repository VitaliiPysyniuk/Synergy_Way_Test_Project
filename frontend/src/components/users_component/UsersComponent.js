import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {UserComponent} from "../user_component/UserComponent";
import {NotificationComponent} from "../notification_component/NotificationComponent";
import {userServices} from '../../services';


export const UsersComponent = () => {
    const [users, setUsers] = useState(null);
    const [options, setOptions] = useState(null);


    const fetchUsers = async () => {
        const userData = await userServices.getAllUsers();
        sortUsersById(userData)
        return userData;
    }

    const sortUsersById = (arr) => {
        arr.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    const onUserDelete = async (userId) => {
        const status = await userServices.deleteUser(userId);

        if (status === 204) {
            setOptions({messageText: "User successfully deleted.", type: "show custom-btn-success"});
        } else if (status === 400) {
            setOptions({messageText: "Something goes wrong.", type: "show custom-btn-danger"});
        } else if (status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }
        setUsers(await fetchUsers());
    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    useEffect(async () => {
        setUsers(await fetchUsers());
    }, [])

    return (
        <div className="w-75 mx-auto">
            {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
            <div className="d-flex justify-content-end">
                <Link to={'/users/add'}>
                    <button type="button" className="btn btn-outline-primary my-2">Add user</button>
                </Link>
            </div>
            <hr className="my-0"/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Id</th>
                    <th scope="col" className="text-center">Username</th>
                    <th scope="col" className="text-center">Groups</th>
                    <th scope="col" className="text-center">Created</th>
                    <th scope="col" className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {users && users.map(user => <UserComponent user={user} key={user.id} onUserDelete={onUserDelete}/>)}
                </tbody>
            </table>
        </div>
    )
};
