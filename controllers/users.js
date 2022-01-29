const express = require('express')
const session = require('express-session')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')



/************************************/
/*        Login Create Route        */
/************************************/
router.post('/login', (req, res) => {
    console.log('hitting login route')
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) return res.send(err)
        if (!foundUser)
        {
            console.log('User not found')
            res.redirect('/')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password))
            {
                console.log('Logged in>>', foundUser._id)
                req.session.currentUser = foundUser
                res.redirect('/')
            } else {
                console.log('Login failed')
                res.redirect('/')
            }
        }
    })
})


/*******************************************/
/*        Registration Create Route        */
/*******************************************/
router.post('/registration', (req, res) => {
    console.log('hitting registration route')
    const passwordHash = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
    )

    const userDbEntry = {
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
    }

    User.create(userDbEntry, (err, createdUser) => {
        if (err) return res.send(err)
        req.session.currentUser = createdUser
        console.log('Registration successful')
        res.redirect('/')
    })
})


/******************************/
/*        Logout Route        */
/******************************/
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.send(err)
    })
    res.redirect('/')
})


module.exports = router
