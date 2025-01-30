import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

// global variables

const currency='inr'
const deliveryCharge=50;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD method

const placeOrder=async (req,res)=>{
    try {
        const userId=req.userId;
        const {items,amount,address}=req.body;
        // console.log("---------------->",userId)
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now(),
        };
        const newOrder=new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success:true,message:"Order Placed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// Placing orders using Stripe method

const placeOrderStripe=async (req,res)=>{
    try {
        const userId=req.userId;
        const {items,amount,address}=req.body;
        const {origin}=req.headers;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });
        
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:"payment"
        })
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message});

    }

}
// Verify Stripe

const verifyStripe=async (req, res) => {
    const userId=req.userId;
    const {orderId,success}=req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await orderModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message});
    }
}

// All orders for admin panel

const allOrders=async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        console.log(orders)
        res.json({success:true,orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// User Order Data for Frontend

const userOrders=async (req,res)=>{
    try {
        const userId=req.userId;
        // console.log(userId);
        // console.log("dharmika",userId);
        const orders=await orderModel.find({userId});
        console.log(orders);
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//update Order Status for Admin panel

const updateStatus=async (req,res)=>{
    try {
        const {orderId,status}=req.body;
    await orderModel.findByIdAndUpdate(orderId,{status});
    res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:true,message:error.message})
    }
}

export {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe}

