const mongoose = require("mongoose");

const courseAssignSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
});

const CourseAssign = mongoose.model("course-assign", courseAssignSchema);
module.exports = CourseAssign;
