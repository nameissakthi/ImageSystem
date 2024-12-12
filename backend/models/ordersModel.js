import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderNumber : {
        type : String,
        required : true
    },  
    orderFrom : {
        type : String,
        required : true
    },
    bankIfsc : {
        type : String,
    },
    bankName : {
        type : String,
        required : true
    },
    bankLogo : {
        type : String,
        required : true
    },
    Date : {
        type : String,
        required : true
    },
    Time : {
        type : String,
        required : true
    },
    phoneno : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    products : {
        type : Array,
        required : true
    },
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel