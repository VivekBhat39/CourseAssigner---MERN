const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

let CourseAssign = require("../models/CourseAssignSchema");
// const Course = require("../models/CourseSchema");

const router = express.Router();
router.use(express.json());

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/", async (req, res) => {

    try {

        const { userId, courseId } = req.body;

        const courseAssignData = await CourseAssign.create({ userId, courseId });

        res.json({ status: "success", data: courseAssignData })
    }catch(err){
        res.json({ status: "error", data: err })
    }
});

router.get("/", async (req, res) => {

    try {
        const userCourses = await CourseAssign.find();

        res.json({ status: "success", data: userCourses })
    } catch (err) {
        res.json({ status: "ERROR", data: err })
    }
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    // console.log(userId);

    try {

        const userCourses = await CourseAssign.find({ userId }).populate("courseId");

        res.send({ status: "success", data: userCourses });

    } catch (err) {
        res.send({ status: "Error", data: err })
    }
});

// router.get("/:id", async (req, res) => {
//     const userId = req.params.id;  // Extract userId from the request parameters

//     try {
//         // Query for CourseAssign documents where userId matches
//         const userCourses = await CourseAssign.find({ userId }).populate("courseId");  // Use `courseId` to populate

//         if (!userCourses.length) {
//             return res.send({ status: "error", message: "No courses found for this user" });
//         }

//         // Send the response with populated course data
//         res.send({ status: "success", data: userCourses });
//     } catch (error) {
//         console.error("Error:", error);
//         res.send({ status: "error", message: "Server error" });
//     }
// });

module.exports = router;

