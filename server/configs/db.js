import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        mongoose.connection.on('connected', ()=>{
            console.log('data base Connected');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/shopeasy`)
    }catch(error){
        console.error(error);
    }
}

export default connectDB;