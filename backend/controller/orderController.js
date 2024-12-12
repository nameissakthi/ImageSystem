import orderModel from "../models/ordersModel.js";

const newOrder = async (req, res) => {
    try {
        const { order } = req.body

        const date = new Date(); 

        function formatDate(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0'); // Ensures two digits for the day
            const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, add 1
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        }
        

        function convertToIST(date) {
            const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const timeIn12HourFormat = istDate.toLocaleString('en-US', options);
            return timeIn12HourFormat;
        }
        

        const orderData = {
            orderNumber : order.billNumber,
            orderFrom : order.name,
            bankIfsc : order.bankIfsc,
            bankName : order.bankName,
            bankLogo : order.bankLogo,
            Date : formatDate(date),
            Time : convertToIST(date),
            phoneno : order.phoneno,
            email : order.email,
            address : order.address,
            products : order.cart
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()


        res.json({success : true, message : "Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const allOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({})

        res.json({success : true, orders})

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

const bankOrder = async (req, res) => {
    try {
        const { bankIfsc } = req.body

        const orders = await orderModel.find({ bankIfsc })
        res.json({success : true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}


export { newOrder, allOrder, bankOrder }