const bodyParser = require('body-parser');
let express = require('express');
let router = express.Router();

const Course = require('../models/CourseSchema');
router.use(express.json());

router.use(bodyParser.json({ limit: "50mb" }))
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

router.post("/", async (req, res) => {
    try {
        const { name, description, duration, fees } = req.body;

        const addCourse = await Course.create({ name, description, duration, fees });
        res.json({ status: "success", data: addCourse })
    } catch (err) {
        res.json({ status: "Error", data: err });
    }
});

router.get("/", async (req, res) => {
    try {
        const getAllCourse = await Course.find();

        res.json({ status: "success", data: getAllCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const SingleCourse = await Course.findById(req.params.id);

        res.json({ status: "success", data: SingleCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const body = req.body;

        const SingleCourse = await Course.findByIdAndUpdate(courseId, body, { new: true });

        res.json({ status: "success", data: SingleCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

module.exports = router;