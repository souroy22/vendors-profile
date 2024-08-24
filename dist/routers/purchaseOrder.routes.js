"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseOrder_controller_1 = __importDefault(require("../controllers/purchaseOrder.controller"));
const purchaseOrderRouter = (0, express_1.Router)();
purchaseOrderRouter.post("/", purchaseOrder_controller_1.default.createPurchaseOrder);
purchaseOrderRouter.get("/", purchaseOrder_controller_1.default.listPurchaseOrders);
purchaseOrderRouter.get("/:poId", purchaseOrder_controller_1.default.getPurchaseOrderById);
purchaseOrderRouter.put("/:poId", purchaseOrder_controller_1.default.updatePurchaseOrder);
purchaseOrderRouter.delete("/:poId", purchaseOrder_controller_1.default.deletePurchaseOrder);
exports.default = purchaseOrderRouter;
//# sourceMappingURL=purchaseOrder.routes.js.map