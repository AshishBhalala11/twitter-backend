const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/authentication");

dotenv.config();

//database connection 
mongoose.connect(process.env.DATABASE_LINK)
.then(() => {console.log('now connected to DB')})
.catch((err) => {console.log(err)});

//miidleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" , userRoute);
app.use("/api/authentication" , authRoute);


app.get("/" , (req,res) => {
    res.send("welcome to home");
});

app.get("/users" , (req,res) => {
    res.send("welcome to user page");
});

//listening to server
app.listen(3000, () => {
    console.log("listening to post 3000");
});