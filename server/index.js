// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require('cors');
// const UsersModel = require('./models/Users');
// const bcrypt = require('bcryptjs');


// const app = express()
// app.use(express.json())
// // app.use(cors())
// app.use(cors({
//     origin: 'https://food-cream-delivery-frontend.onrender.com/', // Replace with your frontend URL
//     credentials: true,
// }));


// mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// // ("mongodb://127.0.0.1:27017/users")

// app.post("/login", (req, res) => {
//     const {email, password} = req.body;
//     UsersModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             bcrypt.compare(password, user.password, (err, response) => {
//                 if(response) {
//                     res.json("Success")
//                 } else {
//                     res.json("the password is incorrect")
//                 }
//             })
        
//         } else {
//             console.error("Error finding user:", err);
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body
//     bcrypt.hash(password, 10)
//     .then(hash => {
//         UsersModel.create({name, email, password: hash})
//         .then(userss => res.json(userss))
//         .catch(err => res.json(err))
//     }).catch(err => console.log(err.message))
        
// })

// app.get("/status", (req, res) => {
//     res.status(200).json({status: "Server is running"})
// })


// app.listen(3001, () => {
//     console.log("server is running on port 3001")
// })

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Enable CORS with your frontend URL
app.use(cors({
    origin: 'https://food-cream-delivery-frontend.onrender.com', // Replace with your frontend URL
    credentials: true,
}));

// Use environment variable for MongoDB URI or fallback to local
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password }); // Log the incoming request

    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json("Success");
                    } else {
                        res.json("The password is incorrect");
                    }
                });
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json("Internal Server Error");
        });
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UsersModel.create({ name, email, password: hash })
                .then(userss => res.json(userss))
                .catch(err => res.status(500).json(err));
        }).catch(err => {
            console.error("Error hashing password:", err);
            res.status(500).json("Internal Server Error");
        });
});

// Status endpoint
app.get("/status", (req, res) => {
    res.status(200).json({ status: "Server is running" });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3001; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

