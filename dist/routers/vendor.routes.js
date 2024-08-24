"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_controllers_1 = __importDefault(require("../controllers/vendor.controllers"));
const performance_controller_1 = __importDefault(require("../controllers/performance.controller"));
const vendorRouter = (0, express_1.Router)();
vendorRouter.post("/", vendor_controllers_1.default.createVendor);
vendorRouter.get("/", vendor_controllers_1.default.listVendors);
vendorRouter.get("/:vendorCode", vendor_controllers_1.default.getVendorById);
vendorRouter.put("/:vendorCode", vendor_controllers_1.default.updateVendor);
vendorRouter.delete("/:vendorCode", vendor_controllers_1.default.deleteVendor);
vendorRouter.get("/:vendorCode/performance", performance_controller_1.default.getVendorPerformance);
exports.default = vendorRouter;
//# sourceMappingURL=vendor.routes.js.map