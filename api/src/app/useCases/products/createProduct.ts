import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProducts(req: Request, res: Response) {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
