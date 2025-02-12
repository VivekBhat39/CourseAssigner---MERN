import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './components/Users';
import Courses from './components/Courses';
import CourseAssigner from './components/CourseAssigner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseAssigner />} />
          <Route path="/users" element={<Users />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App