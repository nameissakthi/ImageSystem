import express from "express"
import { newProduction, listProduction, deleteProduction } from "../controller/productionController.js"

const productionRouter = express.Router();

productionRouter.post('/new', newProduction)
productionRouter.get('/list', listProduction)
productionRouter.post('/delete', deleteProduction)

export default productionRouter;