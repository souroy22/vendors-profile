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
const purchaseOrderControllers = {
    createPurchaseOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_model_1.default.findOne({ vendorCode: req.body.vendor });
            if (!vendor) {
                return res.status(404).json({ error: "No vender found with this ID" });
            }
            const data = Object.assign(Object.assign({}, req.body), { vendor: vendor._id });
            const newPO = new purchesOrder_model_1.default(data);
            yield newPO.save();
            return res.status(201).json(newPO);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Error creating purchase order" });
            }
        }
    }),
    listPurchaseOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendorId = req.query.vendorId;
            const filter = vendorId ? { vendor: vendorId } : {};
            const purchaseOrders = yield purchesOrder_model_1.default.find(filter).populate("vendor");
            res.status(200).json(purchaseOrders);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res
                    .status(500)
                    .json({ error: "Error fetching purchase orders" });
            }
        }
    }),
    getPurchaseOrderById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const purchaseOrder = yield purchesOrder_model_1.default.findById(req.params.poId).populate("vendor");
            if (!purchaseOrder)
                return res.status(404).json({ message: "Purchase order not found" });
            return res.status(200).json(purchaseOrder);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Error fetching purchase order" });
            }
        }
    }),
    updatePurchaseOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedPO = yield purchesOrder_model_1.default.findByIdAndUpdate(req.params.poId, req.body, { new: true });
            if (!updatedPO)
                return res.status(404).json({ message: "Purchase order not found" });
            res.status(200).json(updatedPO);
        }
        catch (error) {
            res.status(500).json({ error: "Error updating purchase order" });
        }
    }),
    deletePurchaseOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedPO = yield purchesOrder_model_1.default.findByIdAndDelete(req.params.poId);
            if (!deletedPO)
                return res.status(404).json({ message: "Purchase order not found" });
            res.status(200).json({ message: "Purchase order deleted successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Error deleting purchase order" });
            }
        }
    }),
};
exports.default = purchaseOrderControllers;
//# sourceMappingURL=purchaseOrder.controller.js.map