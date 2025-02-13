import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Users() {

    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);

    const [singleUser, setSingleUser] = useState({ name: "", email: "" });
    const [id, setId] = useState(undefined);

    function handleChange(e) {
        setSingleUser({ ...singleUser, [e.target.id]: e.target.value });
    };

    function fetchUsersData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/user")
            .then((res) => {
                // console.log(res.data.data);
                setUsers(res.data.data);
                setFilteredUser(res.data.data);
            });
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    function handleUpdate(id) {
        setId(id)
        axios.get(import.meta.env.VITE_BASE_URL + "/user/" + id)
            .then((res) => {
                console.log(res.data.data);
                const { name, email } = res.data.data;
                // console.log(name, email);
               
                setSingleUser({
                    name: name,
                    email: email
                })
            })

    };

    function handleDelete(id) {
        axios.delete(import.meta.env.VITE_BASE_URL + "/user/" + id)
            .then((res) => {
                // console.log(res.data.data);
                fetchUsersData();
            })
    };

    function handleSubmit(e) {
        e.preventDefault();

        axios.put(import.meta.env.VITE_BASE_URL + "/user/" + id, singleUser)
            .then((res) => {
                // console.log(res.data.data);
                fetchUsersData();
                setId(undefined)
            });
    };

    function searchUser(e) {
        const searchText = e.target.value;

        if (searchText.toLowerCase() == "") {
            setFilteredUser(users);
        } else {

            const foundUser = users.filter((user) => {
                return (user.name.toLowerCase().includes(searchText) ||
                    user.email.toLowerCase().includes(searchText)
                )
            });

            // console.log(foundUser);
            setFilteredUser(foundUser);
        }

    };

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex'>
                    <Link to={"/"}>
                        <button className='btn btn-primary me-3'><i className="fa-solid fa-house"></i></button>
                    </Link>
                    <input onChange={searchUser} type="text" className='form-control' placeholder='Search User' />
                </div>

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
                            filteredUser.map((eachData, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{eachData.name}</td>
                                        <td>{eachData.email}</td>
                                        <td>
                                            <button onClick={() => handleUpdate(eachData._id)} className='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                            <button onClick={() => handleDelete(eachData._id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>



                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={handleChange} value={singleUser.name} id="name" className="form-control mb-3" type="text" placeholder="Name" />
                                <input onChange={handleChange} value={singleUser.email} id="email" className="form-control" type="text" placeholder="Email" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users