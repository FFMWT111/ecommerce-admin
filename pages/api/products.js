import { Product } from "@/models/Products";
import mongoose from "mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(request, response) {
  const mongoUrl = process.env.MONGODB_URL;
  mongoose.connect(mongoUrl);
  await isAdminRequest(request, response);
  const { method } = request;

  if (method === "POST") {
    const { title, description, price, images, category, properties } =
      request.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    console.log(productDoc, "1111111111111111111111111111111`");
    response.json(productDoc);
  }

  if (method === "GET") {
    if (request.query?.id) {
      response.json(await Product.findOne({ _id: request.query.id }));
    } else {
      response.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const { title, description, price, _id, images, category, properties } =
      request.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    response.json(true);
  }

  if (method === "DELETE") {
    if (request.query?.id) {
      await Product.deleteOne({ _id: request.query?.id });
      response.json(true);
    }
  }
}
