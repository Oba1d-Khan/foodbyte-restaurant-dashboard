import mongoose from "mongoose";
import { getErrorMessage } from "../utils/getErrorMessage";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "food-dashboard",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.log("Error: ", errorMessage);
    throw new Error(errorMessage);
  }
};

export default connect;
