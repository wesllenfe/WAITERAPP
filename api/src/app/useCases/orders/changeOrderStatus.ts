import type { Request, Response } from "express"
import { Order } from "../../models/Order"

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params
    const { status } = req.body

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json({ error: "Status should be one of these: WAITING, IN_PRODUCTION, DONE" })
    }

    await Order.findByIdAndUpdate(orderId, { status })

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

