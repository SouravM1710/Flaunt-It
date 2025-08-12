import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";


//global varibale
const currency = 'inr';
const deliveryCharge = 10;

//gateway initailize
const RazorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing order using Cod Method
const placeOrder = async (req, res) => {

    try {

        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now(),
        }
        
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true, message: "Order placed successfully"});
        
      
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}


// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {

    

}


// all order for admin panel
const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

//Placing order for razor pay
const placeOrderRazorpay = async (req, res) => {

    try {
        const {userId, items, amount, address} = req.body;
        

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment:false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await RazorpayInstance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error);
                res.json({ success: false, message: error.message });
            }else{
                res.json({success: true, order});
            }
        })
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success: true, message: "Payment verified successfully"});
        } else{
            res.json({success: false, message: "Payment failed"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//User order data for frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Upadate order status from admin panel
const updateStatus = async (req, res) => {

    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({success: true, message: "Status updated successfully"});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

export { verifyRazorpay, placeOrder, placeOrderStripe, allOrders, placeOrderRazorpay, userOrders, updateStatus}