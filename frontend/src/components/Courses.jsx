import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Courses() {

    const [courses, setCourses] = useState([]);

    function fetchCoursData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/course")
            .then((res) => {
                // console.log(res.data.data);
                setCourses(res.data.data);
            });
    };

    useEffect(() => {
        fetchCoursData();
    }, []);

    function handleDelete(id) {
        axios.delete(import.meta.env.VITE_BASE_URL + "/course/" + id)
            .then((res) => {
                console.log(res.data.data);
                fetchCoursData();
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
                            <th scope="col">Duration</th>
                            <th scope="col">Fees</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((eachData, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{eachData.name}</td>
                                        <td>{eachData.description}</td>
                                        <td>3 Months</td>
                                        <td>30,000</td>
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

export default Courses