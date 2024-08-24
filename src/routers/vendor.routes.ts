import { Router } from "express";
import vendorControllers from "../controllers/vendor.controllers";
import performanceControllers from "../controllers/performance.controller";

const vendorRouter = Router();

vendorRouter.post("/vendors", vendorControllers.createVendor);
vendorRouter.get("/vendors", vendorControllers.listVendors);
vendorRouter.get("/vendors/:vendorId", vendorControllers.getVendorById);
vendorRouter.put("/vendors/:vendorId", vendorControllers.updateVendor);
vendorRouter.delete("/vendors/:vendorId", vendorControllers.deleteVendor);
vendorRouter.get(
  "/vendors/:vendorId/performance",
  performanceControllers.getVendorPerformance
);

export default vendorRouter;
