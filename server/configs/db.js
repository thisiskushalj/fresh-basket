import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/fresh-basket`)
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDB;