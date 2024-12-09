import express from "express"
import cors from "cors"
import 'dotenv/config'
import connetDB from "./config/mongodb.js"
import bankAccRouter from "./routes/bankAccRoute.js"

const app = express()
const port = process.env.PORT || 4000
connetDB()

app.use(express.json())
app.use(cors())

app.use('/api/bankAcc', bankAccRouter)

app.get("/", (req,res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log("Server Running on ",port)
})