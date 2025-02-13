import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Courses() {

    const [courses, setCourses] = useState([]);
    const [filteredCourse, setFilteredCourse] = useState([]);

    const [singleCourse, setSingleCourse] = useState({ name: "", description: "", duration: "", fees: "" });
    const [id, setId] = useState(undefined);

    function fetchCoursData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/course")
            .then((res) => {
                // console.log(res.data.data);
                setCourses(res.data.data);
                setFilteredCourse(res.data.data);
            });
    };

    useEffect(() => {
        fetchCoursData();
    }, []);

    function handleChange(e) {
        setSingleCourse({ ...singleCourse, [e.target.id]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(singleCourse);
        axios.put(import.meta.env.VITE_BASE_URL + "/course/" + id, singleCourse)
            .then((res) => {
                console.log(res.data.data);
                fetchCoursData();
                setId(undefined);
                setCourses({ name: "", description: "", duration: "", fees: "" });
            })
    };

    function handleUpdate(id) {
        setId(id)
        axios.get(import.meta.env.VITE_BASE_URL + "/course/" + id)
            .then((res) => {
                // console.log(res.data.data);
                const { name, description, duration, fees } = res.data.data;
                // console.log(name, description);

                setSingleCourse({
                    name: name,
                    description: description,
                    duration: duration,
                    fees: fees
                })
            })

    };

    function handleDelete(id) {
        axios.delete(import.meta.env.VITE_BASE_URL + "/course/" + id)
            .then((res) => {
                console.log(res.data.data);
                fetchCoursData();
            })
    };

    function searchCourse(e) {
        const searchText = e.target.value;
        console.log(searchText);

        if (searchText.toLowerCase() == "") {
            setFilteredCourse(courses);
        } else {

            const foundCourse = courses.filter((course) => {
                return (course.name.toLowerCase().includes(searchText) ||
                    course.description.toLowerCase().includes(searchText)
                )
            });

            // console.log(foundCourse);
            setFilteredCourse(foundCourse);
        }

    };

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex'>
                    <Link to={"/"}>
                        <button className='btn btn-primary me-3'><i className="fa-solid fa-house"></i></button>
                    </Link>
                    <input onChange={searchCourse} type="text" className='form-control' placeholder='Search User' />
                </div>

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
                            filteredCourse.map((eachData, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{eachData.name}</td>
                                        <td>{eachData.description}</td>
                                        <td>{eachData.duration} Months</td>
                                        <td>₹{eachData.fees}</td>
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
                                <input onChange={handleChange} value={singleCourse.name} id="name" className="form-control mb-3" type="text" placeholder="Name" />
                                <input onChange={handleChange} value={singleCourse.description} id="description" className="form-control mb-3" type="text" placeholder="Email" />
                                <input onChange={handleChange} value={singleCourse.duration} id="duration" className="form-control mb-3" type="text" placeholder="Duration" />
                                <input onChange={handleChange} value={singleCourse.fees} id="fees" className="form-control mb-3" type="text" placeholder="Fees" />
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

export default Courses