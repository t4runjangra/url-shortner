import mongoose  from "mongoose";

const DB_NAME = "e-commerce";

const connectDB = async () => {
    try {
       const connect =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`connected to MongoDB successfully : ${connect.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export {connectDB};