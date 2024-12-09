import mongoose from "mongoose";

const bankAccSchema = new mongoose.Schema({
    ifsc : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
}, { minimize : false })

const bankAccModel = mongoose.models.bankAcc || mongoose.model('bankAcc', bankAccSchema)

export default bankAccModel