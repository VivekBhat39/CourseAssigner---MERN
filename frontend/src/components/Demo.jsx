import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Demo() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [course, setCourse] = useState({ name: "", description: "", duration: "", fees: "" });
  const [assignCourse, setAssignCourse] = useState({ userId: "", courseId: "" });

  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [userCourseData, setUserCourseData] = useState([]);

  function fetchUserCourse(e) {
    const userId = e.target.value;
    if (userId) {
      axios.get(import.meta.env.VITE_BASE_URL + "/course-assign/" + userId)
        .then((res) => {
          setUserCourseData(res.data.data);
        });
    } else {
      setUserCourseData([]);
    }
  }

  function loadUserData() {
    axios.get(import.meta.env.VITE_BASE_URL + "/user")
      .then((res) => {
        setUserData(res.data.data);
      });
  }

  function loadCourseData() {
    axios.get(import.meta.env.VITE_BASE_URL + "/course")
      .then((res) => {
        setCourseData(res.data.data);
      });
  }

  useEffect(() => {
    loadUserData();
    loadCourseData();
  }, []);

  function userHandleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  function courseHandleChange(e) {
    setCourse({ ...course, [e.target.id]: e.target.value });
  }

  function assignCourseHandleChange(e) {
    setAssignCourse({ ...assignCourse, [e.target.id]: e.target.value });
  }

  function userHandleSubmit(e) {
    e.preventDefault();
    axios.post(import.meta.env.VITE_BASE_URL + "/user", user)
      .then((res) => {
        console.log(res.data.data);
        loadUserData();
        loadCourseData();
      });
    setUser({
      name: "",
      email: ""
    });
  }

  function courseHandleSubmit(e) {
    e.preventDefault();
    axios.post(import.meta.env.VITE_BASE_URL + "/course", course)
      .then((res) => {
        console.log(res.data.data);
        loadUserData();
        loadCourseData();
      });
    setCourse({
      name: "",
      description: ""
    });
  }

  function assignCourseHandleSubmit(e) {
    e.preventDefault();
    axios.post(import.meta.env.VITE_BASE_URL + "/course-assign", assignCourse)
      .then((res) => {
        console.log(res.data.data);
        setAssignCourse({
          userId: "",
          courseId: ""
        });
      });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row min-vh-100">

          {/* Sidebar Section */}
          <div className="col-lg-3 bg-light p-4">
            <h1 className="h4 mb-4">SELECT USER</h1>
            <select className="form-select mb-3" onChange={fetchUserCourse}>
              <option value="">Select User</option>
              {userData.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">Add User</button>
              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#courseModal">Add Course</button>
              <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#assign-courseModal">Assign Course</button>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="col-lg-9 p-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {userCourseData.map((eachData) => (
                <div key={eachData._id} className="col">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{eachData.courseId.name}</h5>
                      <p className="card-text">{eachData.courseId.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <a href="#" className="btn btn-outline-primary btn-sm">View</a>
                        {/* <a href="#" className="btn btn-outline-secondary btn-sm">Edit</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modals Section */}
          <div>

            {/* User Modal */}
            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="userModalLabel">Add User</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <input onChange={userHandleChange} value={user.name} id="name" className="form-control mb-3" type="text" placeholder="Name" />
                    <input onChange={userHandleChange} value={user.email} id="email" className="form-control" type="text" placeholder="Email" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={userHandleSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Modal */}
            <div className="modal fade" id="courseModal" tabIndex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="courseModalLabel">Add Course</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <input onChange={courseHandleChange} id="name" value={course.name} className="form-control mb-3" type="text" placeholder="Title" />
                    <input onChange={courseHandleChange} id="description" value={course.description} className="form-control mb-3" type="text" placeholder="Description" />
                    <input onChange={courseHandleChange} id="duration" value={course.description} className="form-control mb-3" type="text" placeholder="Duration" />
                    <input onChange={courseHandleChange} id="duration" value={course.description} className="form-control mb-3" type="text" placeholder="Fees (INR)" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={courseHandleSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Course Modal */}
            <div className="modal fade" id="assign-courseModal" tabIndex="-1" aria-labelledby="assignCourseModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="assignCourseModalLabel">Assign Course</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <select onChange={assignCourseHandleChange} className="form-select mb-3" id="userId" value={assignCourse.userId}>
                      <option value="">Select User</option>
                      {userData.map((user, i) => (
                        <option key={i} value={user._id}>{user.name}</option>
                      ))}
                    </select>
                    <select onChange={assignCourseHandleChange} className="form-select" id="courseId" value={assignCourse.courseId}>
                      <option value="">Select Course</option>
                      {courseData.map((course, i) => (
                        <option key={i} value={course._id}>{course.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={assignCourseHandleSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Demo;