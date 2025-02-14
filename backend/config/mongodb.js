import mongoose from 'mongoose';
mongoose.set("strictQuery", true);

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('DB connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    
    
}

export default connectDB