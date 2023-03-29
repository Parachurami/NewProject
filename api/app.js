const express = require("express");
const { default: helmet } = require("helmet");
const cors = require("cors")
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const mongoose =
 require("mongoose");
 require("dotenv").config();
const { MONGODB } = process.env;


app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB, { useNewUrlParser:true, useUnifiedTopology:true },)

const userRoute = require("./routes/users")
app.use("/api/users", userRoute);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const postRouter = require("./routes/post");
app.use("/api/post", postRouter);



app.listen(8800, () =>{
    console.log("Server running on port");
})