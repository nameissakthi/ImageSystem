import bankAccModel from "../models/bankAccModel.js"


const loginBankAcc = async (req, res) => {
    try {
        const { ifsc, password } = req.body

        const user = await bankAccModel.findOne({ifsc})

        if(!user){
            return res.json({success : false, message : "Bank Doesn't Exists"})
        }

        if(user.password === password){
            res.json({success : true})
        }else{
            res.json({success : false, message : "Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

const addBankAcc = async (req, res) => {
    try {
        const { ifsc, password, name, logo, address, products } = req.body

        const exits = await bankAccModel.findOne({ifsc})
        if(exits){
            return res.json({success : false, message : "Bank Account Already Exists"})
        }

        const newBankAcc = new bankAccModel({
            ifsc,
            password,
            name,
            logo,
            address,
            products
        })

        const user = await newBankAcc.save()

        res.json({success : true, message : "Account Created Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

export { loginBankAcc, addBankAcc }