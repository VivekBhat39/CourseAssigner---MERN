import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Users() {

    const [users, setUsers] = useState([]);

    function fetchUsersData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/user")
            .then((res) => {
                // console.log(res.data.data);
                setUsers(res.data.data);
            });
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    function handleDelete(id) {
        axios.delete(import.meta.env.VITE_BASE_URL + "/user/" + id)
            .then((res) => {
                // console.log(res.data.data);
                fetchUsersData();
            })
    }

    return (
        <>
            <div className="container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((eachData, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{eachData.name}</td>
                                        <td>{eachData.email}</td>
                                        <td>
                                            <button className='btn btn-primary me-1'>Edit</button>
                                            <button onClick={() => handleDelete(eachData._id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users