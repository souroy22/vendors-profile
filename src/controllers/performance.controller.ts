import { Request, Response } from "express";
import PurchaseOrder from "../models/purchesOrder.model";
import Vendor from "../models/vendor.model";

const performanceControllers = {
  getVendorPerformance: async (req: Request, res: Response) => {
    try {
      const vendorId = req.params.vendorCode;
      const vendor = await Vendor.findOne({ vendorCode: vendorId });
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });

      const purchaseOrders = await PurchaseOrder.find({ vendor: vendor._id });

      // Calculating performance metrics
      const onTimeDeliveries = purchaseOrders.filter(
        (po) => po.status === "completed" && po.deliveryDate <= po.deliveryDate
      ).length;
      const totalCompletedPOs = purchaseOrders.filter(
        (po) => po.status === "completed"
      ).length;
      const onTimeDeliveryRate =
        (onTimeDeliveries / totalCompletedPOs) * 100 || 0;

      const qualityRatings = purchaseOrders
        .filter((po) => po.qualityRating !== undefined)
        .map((po) => po.qualityRating!);
      const qualityRatingAvg =
        qualityRatings.reduce((a, b) => a + b, 0) / qualityRatings.length || 0;

      const responseTimes = purchaseOrders
        .filter((po) => po.acknowledgmentDate !== undefined)
        .map(
          (po) =>
            (po.acknowledgmentDate!.getTime() - po.issueDate.getTime()) /
            (1000 * 60 * 60)
        ); // in hours
      const averageResponseTime =
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0;

      const fulfilledPOs = purchaseOrders.filter(
        (po) => po.status === "completed"
      ).length;
      const fulfillmentRate = (fulfilledPOs / purchaseOrders.length) * 100 || 0;

      // Update vendor with calculated metrics
      vendor.onTimeDeliveryRate = onTimeDeliveryRate;
      vendor.qualityRatingAvg = qualityRatingAvg;
      vendor.averageResponseTime = averageResponseTime;
      vendor.fulfillmentRate = fulfillmentRate;
      await vendor.save();

      res.status(200).json({
        onTimeDeliveryRate,
        qualityRatingAvg,
        averageResponseTime,
        fulfillmentRate,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching vendor performance metrics", error });
    }
  },
};

export default performanceControllers;
