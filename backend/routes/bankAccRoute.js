import express from "express"
import { loginBankAcc } from "../controller/bankAccController.js"

const bankAccRouter = express.Router()

bankAccRouter.post('/login', loginBankAcc)

export default bankAccRouter