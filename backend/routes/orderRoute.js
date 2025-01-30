import express from 'express';
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter=express.Router();

//Admin Features
orderRouter.get('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);

// User Features
orderRouter.get('/userorders',authUser,userOrders);

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe);

export default orderRouter;

// verify payment
