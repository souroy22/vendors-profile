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
exports.generateVendorCode = void 0;
const slugify_1 = __importDefault(require("slugify"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
// Initialize the ShortUniqueId generator
const shortUUID = (0, short_uuid_1.default)();
const generateVendorCode = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const nameWithoutSpaces = name.replace(/\s+/g, "");
    // Generate a slug and remove any special characters
    let vendorCode = (0, slugify_1.default)(nameWithoutSpaces, {
        replacement: "", // Replace spaces with nothing
        remove: /[*+~.()'"!:@]/g, // Remove special characters
        lower: true, // Convert to lowercase
    });
    const existingVendor = yield vendor_model_1.default.findOne({ vendorCode });
    // If the vendorCode exists, append a short UUID
    if (existingVendor) {
        vendorCode = yield `${vendorCode}-${shortUUID.generate()}`;
    }
    vendorCode = vendorCode;
    return vendorCode;
});
exports.generateVendorCode = generateVendorCode;
//# sourceMappingURL=generateVenderCode.js.map