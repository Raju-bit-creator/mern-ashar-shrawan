const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/Fetchuser');
const router = express.Router()

const JWT_SECRET = "heisagoodboy"

// creating user with using post "api/auth/createuser"
router.post("/createuser", [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, salt),
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(authToken);

        res.json({ user, authToken })

    } catch (error) {
        res.status(500).send("internal server error")
    }
})
// login user with using post "api/auth/login"
router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: "invalid credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ errors: "invalid credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(authToken);

        res.json({ user, authToken })


    } catch (error) {
        res.status(500).send("internal server error")
    }
})

//get users
router.get('/getuser', fetchuser, async (req, res) => {
    try {
       const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("internal server error")
    }
})


module.exports = router