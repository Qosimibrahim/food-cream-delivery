const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/Users')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/users")

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            })
        
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    bcrypt.hash(password, 10)
    .then(hash => {
        UsersModel.create({name, email, password: hash})
        .then(userss => res.json(userss))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
        
})

app.listen(3001, () => {
    console.log("server is running")
})