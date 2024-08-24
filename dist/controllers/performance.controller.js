"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchesOrder_model_1 = __importDefault(require("../models/purchesOrder.model"));
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
const performanceControllers = {
    getVendorPerformance: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendorId = req.params.vendorCode;
            const vendor = yield vendor_model_1.default.findOne({ vendorCode: vendorId });
            if (!vendor)
                return res.status(404).json({ message: "Vendor not found" });
            const purchaseOrders = yield purchesOrder_model_1.default.find({ vendor: vendor._id });
            // Calculating performance metrics
            const onTimeDeliveries = purchaseOrders.filter((po) => po.status === "completed" && po.deliveryDate <= po.deliveryDate).length;
            const totalCompletedPOs = purchaseOrders.filter((po) => po.status === "completed").length;
            const onTimeDeliveryRate = (onTimeDeliveries / totalCompletedPOs) * 100 || 0;
            const qualityRatings = purchaseOrders
                .filter((po) => po.qualityRating !== undefined)
                .map((po) => po.qualityRating);
            const qualityRatingAvg = qualityRatings.reduce((a, b) => a + b, 0) / qualityRatings.length || 0;
            const responseTimes = purchaseOrders
                .filter((po) => po.acknowledgmentDate !== undefined)
                .map((po) => (po.acknowledgmentDate.getTime() - po.issueDate.getTime()) /
                (1000 * 60 * 60)); // in hours
            const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0;
            const fulfilledPOs = purchaseOrders.filter((po) => po.status === "completed").length;
            const fulfillmentRate = (fulfilledPOs / purchaseOrders.length) * 100 || 0;
            // Update vendor with calculated metrics
            vendor.onTimeDeliveryRate = onTimeDeliveryRate;
            vendor.qualityRatingAvg = qualityRatingAvg;
            vendor.averageResponseTime = averageResponseTime;
            vendor.fulfillmentRate = fulfillmentRate;
            yield vendor.save();
            res.status(200).json({
                onTimeDeliveryRate,
                qualityRatingAvg,
                averageResponseTime,
                fulfillmentRate,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error fetching vendor performance metrics", error });
        }
    }),
};
exports.default = performanceControllers;
//# sourceMappingURL=performance.controller.js.map