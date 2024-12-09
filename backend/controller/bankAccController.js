import bankAcc from "../models/bankAccModel.js"


const loginBankAcc = async (req, res) => {
    try {
        const { ifsc, password } = req.body

        const user = await bankAcc.findOne({ifsc})

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

export { loginBankAcc }