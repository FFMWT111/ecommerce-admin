import { Order } from "@/models/Order";
import mongoose from "mongoose";

export default async function handler(request, response) {
  const mongoUrl = process.env.MONGODB_URL;
  mongoose.connect(mongoUrl);
  response.json(await Order.find().sort({ createdAt: -1 }));
}
