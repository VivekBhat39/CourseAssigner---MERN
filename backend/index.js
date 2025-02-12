let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/user_course")
    .then((res) => {
        console.log("Database Connect...");
    });

let app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World !!!")
});

app.use("/user", require('./routes/userRoutes'));
app.use("/course", require('./routes/courseRoutes'));
app.use("/course-assign", require('./routes/courseAssignRoutes'));

app.listen(8080, () => {
    console.log("Server Running in http://localhost:8080");
});

// REFRENCE :- https://www.geeksforgeeks.org/mongoose-populate-method/