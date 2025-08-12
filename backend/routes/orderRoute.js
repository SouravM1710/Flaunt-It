import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, placeOrderRazorpay, userOrders, updateStatus, verifyRazorpay} from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
 

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User feature
orderRouter.post('/userorders',authUser,userOrders);

//verify Payment
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay);


export default orderRouter;