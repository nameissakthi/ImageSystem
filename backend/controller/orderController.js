import orderModel from "../models/ordersModel.js";

const newOrder = async (req, res) => {
    try {
        const { orderNumber, orderFrom, bankIfsc, bankName, bankLogo, phoneno, email, address, products } = req.body

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

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
        
        const localTime = new Date();

        const orderData = {
            orderNumber,
            orderFrom,
            bankIfsc,
            bankName,
            bankLogo,
            Date : formattedToday,
            Time : convertToIST(localTime),
            phoneno,
            email,
            address,
            products
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