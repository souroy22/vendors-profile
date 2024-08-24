import { Router } from "express";
import purchaseOrderControllers from "../controllers/purchaseOrder.controller";

const purchaseOrderRouter = Router();

purchaseOrderRouter.post("/", purchaseOrderControllers.createPurchaseOrder);
purchaseOrderRouter.get("/", purchaseOrderControllers.listPurchaseOrders);
purchaseOrderRouter.get(
  "/:poId",
  purchaseOrderControllers.getPurchaseOrderById
);
purchaseOrderRouter.put("/:poId", purchaseOrderControllers.updatePurchaseOrder);
purchaseOrderRouter.delete(
  "/:poId",
  purchaseOrderControllers.deletePurchaseOrder
);

export default purchaseOrderRouter;
