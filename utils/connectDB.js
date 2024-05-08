import mongoose from "mongoose";

async function connectDB() {
  try {
    if (
      mongoose.connection.readyState !== 1 &&
      mongoose.connection.readyState !== 2
    ) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
