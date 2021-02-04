require("./db/connection");
const cors = require("cors");
const express = require("express");
const {userRouter} = require("./routes/user");
const {blogRouter} = require("./routes/blog")

const port = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter)
app.use(blogRouter)


app.listen(port, () =>{
    console.log(`server is listening on port ${5000}`)
});