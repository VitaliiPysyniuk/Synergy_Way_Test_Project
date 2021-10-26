import React from 'react'
import {Link} from "react-router-dom";

export const UserComponent = ({user, onUserDelete}) => {
    return (
        <tr>
            <th scope="row" className="text-center">{user.id}</th>
            <td className="text-center">{user.username}</td>
            <td className="text-center">
                {user.groups.map(group => (<p className="m-0">{group.group.name}</p>))}
            </td>
            <td className="text-center">{user.creation_time}</td>
            <td className="text-center pe-0">
                <div className="d-flex justify-content-end align-items-center">
                    <Link to={`/users/${user.id}`}>
                        <button type="button" className="btn btn-outline-warning mx-2">Edit User</button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger mx-2 me-0"
                            onClick={() => onUserDelete(user.id)}>
                        Delete User
                    </button>
                </div>
            </td>
        </tr>
    )
}
