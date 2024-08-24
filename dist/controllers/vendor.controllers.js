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
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
const generateVenderCode_1 = require("../utils/generateVenderCode");
const vendorControllers = {
    createVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendorCode = yield (0, generateVenderCode_1.generateVendorCode)(req.body.name);
            const data = Object.assign(Object.assign({}, req.body), { vendorCode });
            const newVendor = new vendor_model_1.default(data);
            yield newVendor.save();
            res.status(201).json(newVendor);
        }
        catch (error) {
            res.status(500).json({ message: "Error creating vendor", error });
        }
    }),
    listVendors: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendors = yield vendor_model_1.default.find();
            res.status(200).json(vendors);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching vendors", error });
        }
    }),
    getVendorById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_model_1.default.findOne({
                vendorCode: req.params.vendorCode,
            });
            if (!vendor)
                return res.status(404).json({ message: "Vendor not found" });
            res.status(200).json(vendor);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching vendor", error });
        }
    }),
    updateVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedVendor = yield vendor_model_1.default.findOneAndUpdate({ vendorCode: req.params.vendorCode }, req.body, { new: true });
            if (!updatedVendor)
                return res.status(404).json({ message: "Vendor not found" });
            res.status(200).json(updatedVendor);
        }
        catch (error) {
            res.status(500).json({ message: "Error updating vendor", error });
        }
    }),
    deleteVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedVendor = yield vendor_model_1.default.findOneAndDelete({
                vendorCode: req.params.vendorCode,
            });
            if (!deletedVendor)
                return res.status(404).json({ message: "Vendor not found" });
            res.status(200).json({ message: "Vendor deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting vendor", error });
        }
    }),
};
exports.default = vendorControllers;
//# sourceMappingURL=vendor.controllers.js.map