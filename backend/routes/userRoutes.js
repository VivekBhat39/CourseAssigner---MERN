const bodyParser = require('body-parser');
let express = require('express');
let router = express.Router();

const User = require('../models/UserSchema');
router.use(express.json());

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/", async (req, res) => {
    try {

        const { name, email } = req.body;

        const addUser = await User.create({ name, email });
        res.json({ status: "success", data: addUser });

    } catch (err) {
        res.json({ status: "Error", data: err })
    }
});

router.get("/", async (req, res) => {
    try {
        const allUser = await User.find();
        res.json({ status: "success", data: allUser })
    } catch (err) {
        res.json({ status: "Error", data: err })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        res.json({ status: "success", data: singleUser })
    } catch (err) {
        res.json({ status: "Error", data: err })
    }
});

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const body = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
        res.json({ status: "success", data: updatedUser })
    } catch (err) {
        res.json({ status: "Error", data: err })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ status: "success", data: deletedUser })
    } catch (err) {
        res.json({ status: "Error", data: err })
    }
});

module.exports = router;