import mongoose from 'mongoose'

const productionSchema = new mongoose.Schema({
    order : {
        type : Object,
        required : true
    },
    designer : {
        type : Array,
        required : true
    },
    level : {
        type : Number,
        required : true
    }
})

const productionModel = mongoose.models.productionModel || mongoose.model("production", productionSchema)

export default productionModel;