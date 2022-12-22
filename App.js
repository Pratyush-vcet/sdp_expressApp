const express = require("express")
const logger = require("./middlewares/logger")

const app = express()
app.use(logger)

app.get("/greetings", (req, res) => {
    return res.status(200).json({
        message: "Hello express project"
    })
})

app.listen(8000, (error) => {
    if (error) {
        console.log("error", error)
    }
    console.log("Server running on 8000")
})