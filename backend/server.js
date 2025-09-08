import express from "express";

const app = express();

app.listen(5000, () => {
    console.log("server is running on http://localhost:5000");
});


app.get("/", (req, res) => {
    res.send("hello world!");
})

