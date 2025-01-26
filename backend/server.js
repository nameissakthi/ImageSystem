import express from "express"
import cors from "cors"
import 'dotenv/config'
import connetDB from "./config/mongodb.js"
import bankAccRouter from "./routes/bankAccRoute.js"
import adminAccRouter from "./routes/adminAccRoute.js"
import orderRouter from "./routes/orderRoute.js"
import productRouter from "./routes/productionRoute.js"

const app = express()
const port = process.env.PORT || 4000
connetDB()

app.use(express.json())
app.use(cors())

app.use('/api/bankAcc', bankAccRouter)
app.use('/api/admin', adminAccRouter)
app.use('/api/order', orderRouter)
app.use('/api/production', productRouter)

app.get("/", (req,res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log("Server Running on ",port)
})