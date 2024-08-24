import { Request, Response } from "express";
import PurchaseOrder from "../models/purchesOrder.model";

const purchaseOrderControllers = {
  createPurchaseOrder: async (req: Request, res: Response) => {
    try {
      const newPO = new PurchaseOrder(req.body);
      await newPO.save();
      return res.status(201).json(newPO);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res
          .status(500)
          .json({ message: "Error creating purchase order", error });
      }
    }
  },
  listPurchaseOrders: async (req: Request, res: Response) => {
    try {
      const vendorId = req.query.vendorId;
      const filter = vendorId ? { vendor: vendorId } : {};
      const purchaseOrders = await PurchaseOrder.find(filter).populate(
        "vendor"
      );
      res.status(200).json(purchaseOrders);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res
          .status(500)
          .json({ message: "Error fetching purchase orders", error });
      }
    }
  },
  getPurchaseOrderById: async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findById(
        req.params.poId
      ).populate("vendor");
      if (!purchaseOrder)
        return res.status(404).json({ message: "Purchase order not found" });
      return res.status(200).json(purchaseOrder);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res
          .status(500)
          .json({ message: "Error fetching purchase order", error });
      }
    }
  },
  updatePurchaseOrder: async (req: Request, res: Response) => {
    try {
      const updatedPO = await PurchaseOrder.findByIdAndUpdate(
        req.params.poId,
        req.body,
        { new: true }
      );
      if (!updatedPO)
        return res.status(404).json({ message: "Purchase order not found" });
      res.status(200).json(updatedPO);
    } catch (error) {
      res.status(500).json({ message: "Error updating purchase order", error });
    }
  },
  deletePurchaseOrder: async (req: Request, res: Response) => {
    try {
      const deletedPO = await PurchaseOrder.findByIdAndDelete(req.params.poId);
      if (!deletedPO)
        return res.status(404).json({ message: "Purchase order not found" });
      res.status(200).json({ message: "Purchase order deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res
          .status(500)
          .json({ message: "Error deleting purchase order", error });
      }
    }
  },
};

export default purchaseOrderControllers;
