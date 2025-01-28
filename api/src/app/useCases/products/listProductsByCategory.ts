import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const products = await Product.find().where('category').equals(req.params.categoryId);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
