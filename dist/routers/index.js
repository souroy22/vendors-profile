"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_routes_1 = __importDefault(require("./vendor.routes"));
const purchaseOrder_routes_1 = __importDefault(require("./purchaseOrder.routes"));
const routers = express_1.default.Router();
routers.use("/purchase-orders", purchaseOrder_routes_1.default);
routers.use("/vendors", vendor_routes_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map