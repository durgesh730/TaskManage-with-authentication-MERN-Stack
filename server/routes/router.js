const express = require('express')
const router = express.Router();
const notes = require("../models/userSchema")
const Signup = require('../models/Signup');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const userSchema = require('../models/userSchema');

const keysecret = "durgeshchaudharydurgeshchaudhary"

router.get("/user", fetchuser, async (req, res) => {
    const user = req.user;
    try {
        const note = await Signup.find({
            _id: user.id
        });
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


router.post('/addnotes', fetchuser, async (req, res) => {
    const user = req.user;
    const { title, description, date } = req.body;
    if (!title || !description) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        const note = new notes({ title, description, date, user: req.user.id })
        // console.log(note)
        const savedNote = await note.save()
        // res.json(savedNote)

        res.status(201).json({ status: 201, savedNote })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// fetch all notes from database
router.get("/notes", fetchuser, async (req, res) => {
    const user = req.user;
    try {
        const note = await notes.find({
            user: user.id
        });
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// delete sticky notes from database using id

router.delete("/allnotes/:id", async (req, res) => {
    try {
        // take the id of particular note and delete than 
        const note = await notes.findByIdAndDelete({ _id: req.params.id });
        res.json(note)
        // console.log(note) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// signup api

router.post('/signup', async (req, res) => {
    // destructure the value of name, email, password form frontend(req.body)
    const { name, email, password } = req.body;
    // check email and password is not blanck
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        // hash the password using salt of 10
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        // check data is present 
        const savedEmail = await Signup.findOne({ email: email })
        // if data exist than return error 
        if (savedEmail) {
            res.status(404).json({ error: "This Email is Already Exist" });
        } else {
            // else condition me save the userdata
            const data = new Signup({ name, email, password: pass })
            // save user data using .save method
            const saveddata = await data.save()
            // return the backend status to frontend
            res.status(201).json({ status: 201, saveddata })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // check password and email
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        //  check entered eamil is valid or not
        const user = await Signup.findOne({ email: email });
        if (user) {
            // after validation email check for password compare password with users entered password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(422).json({ error: "invalid details" })
            } else {
                // create token using secret key
                const data = {
                    user: {
                        id: user.id
                    }
                }
                let token23 = jwt.sign(data, keysecret);

                const result = { user, token: token23 }

                res.status(201).json({ status: 201, result })
            }
        } else {
            // console.log("not working")
            res.status(401).json({ status: 401 });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


// API takes strict query 

// router.get("/ad", async (req, res) => {
//     const { title } = req.query;
//     // const keys = ['title'];
//     const queryObject = {}

//     if (title) {
//         queryObject.title = title;
//     }
//     const d = await notes.find(queryObject)
//     res.status(200).json({ d });
// })

// API for search notes according title

router.get("/title", fetchuser, async (req, res) => {
    const user = req.user
    const keyword = req.query.title
        ?
        { "title": { $regex: req.query.title, $options: "i" } } //case insensitive
        : {};
    // console.log(keyword)
    const data = await notes.find(keyword).find({ user: user.id });
    res.send(data);
});



// router.get("/adate", async (req, res) => {
//     try {
//         const note = await notes.aggregate([
//             {
//                 $match: { date: "2001-02-02" }
//             }
//         ])
//         res.json(note)
//         // console.log(note)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error occured")
//     }
// })

// edit our notes API 
router.put('/editnotes/:id', async (req, res) => {
    const { title, description } = req.body;
    // console.log(title.value)
    try {
        const editNote = {};
        if (title.value) { editNote.title = title.value };
        if (description.value) { editNote.description = description.value };
        //  console.log(editNote)
        const userData = await notes.findOneAndUpdate({ _id: req.params.id },
            { $set: editNote }, { new: true })
         res.status(201).json({ status: 201, userData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router