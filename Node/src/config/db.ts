import mongoose from "mongoose";

export function connectDB() {
    return mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}` as string);
}
