import { Category } from "@/models/Category";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(request, response) {
  const mongoUrl = process.env.MONGODB_URL;
  mongoose.connect(mongoUrl);
  await isAdminRequest(request, response);
  const { method } = request;

  if (method === "GET") {
    response.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = request.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    }); //前面的parent是重新命名的
    response.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = request.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
        properties,
      }
    ); //第一个参数：找到要更新的数据
    response.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = request.query;
    await Category.deleteOne({ _id });
    response.json("ok");
  }
}
