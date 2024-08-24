import { Router } from "express";
import vendorControllers from "../controllers/vendor.controllers";
import performanceControllers from "../controllers/performance.controller";

const vendorRouter = Router();

vendorRouter.post("/", vendorControllers.createVendor);
vendorRouter.get("/", vendorControllers.listVendors);
vendorRouter.get("/:vendorCode", vendorControllers.getVendorById);
vendorRouter.put("/:vendorCode", vendorControllers.updateVendor);
vendorRouter.delete("/:vendorCode", vendorControllers.deleteVendor);
vendorRouter.get(
  "/:vendorCode/performance",
  performanceControllers.getVendorPerformance
);

export default vendorRouter;
