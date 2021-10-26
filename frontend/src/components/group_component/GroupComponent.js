import React from 'react'
import {Link} from "react-router-dom";

export const GroupComponent = ({group, onGroupDelete}) => {
    return (
        <tr key={`row/${group.id}`}>
            <th scope="row" className="text-center">{group.id}</th>
            <td className="text-center">{group.name}</td>
            <td className="text-center">{group.description}</td>
            <td className="text-center">
                {group.users.map(user => (<p className="m-0">{user.user}</p>))}
            </td>
            <td className="text-center pe-0">
                <div className="d-flex justify-content-end align-items-center">
                    <Link to={`/groups/${group.id}`}>
                        <button type="button" className="btn btn-outline-warning mx-2">Edit Group</button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger mx-2 me-0"
                            onClick={() => onGroupDelete(group.id)}>
                        Delete Group
                    </button>
                </div>
            </td>
        </tr>
    )
}
