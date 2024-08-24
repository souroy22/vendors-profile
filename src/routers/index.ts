import express from "express";
import vendorRouter from "./vendor.routes";
import purchaseOrderRouter from "./purchaseOrder.routes";

const routers = express.Router();

routers.use("/purchase-orders", purchaseOrderRouter);
routers.use("/vendors", vendorRouter);

export default routers;
