const express = require("express");

require ("dotenv").config();

const mongoose = require("mongoose");

const routes = require("./controllers/routes");

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json);

app.get("/",(req,res)=>{
    res.send("This is liberary")
})

app.use("/books",routes)

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("DB connected successfully");
    app.listen(4000,()=>{
        console.log("Server connected successfully");
    })
}).catch((error)=>{
    console.log(error)
})

