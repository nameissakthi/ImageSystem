import productionModel from "../models/productionModel.js"

const newProduction = async (req, res) => {
    try {

        const production = req.body

        const productionData = {
            designer : production.designer,
            order : production.order,
            level : production.level || 0
        }

        const newProduction = productionModel(productionData)
        
        await newProduction.save()

        res.json({success : true , message : "Production Started"})
        
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const listProduction = async (req, res) => {
    try {
        const productions = await productionModel.find({})

        res.json({success : true, productions})

    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const deleteProduction = async (req, res) => {
    try { 
        const id = req.body.productionId
        await productionModel.findByIdAndDelete(id)

        res.json({success : true, message : "Production Deleted"})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

export { newProduction, listProduction, deleteProduction }