import { Request, Response } from "express";
import Vendor from "../models/vendor.model";

const vendorControllers = {
  createVendor: async (req: Request, res: Response) => {
    try {
      const newVendor = new Vendor(req.body);
      await newVendor.save();
      res.status(201).json(newVendor);
    } catch (error) {
      res.status(500).json({ message: "Error creating vendor", error });
    }
  },
  listVendors: async (_: Request, res: Response) => {
    try {
      const vendors = await Vendor.find();
      res.status(200).json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vendors", error });
    }
  },
  getVendorById: async (req: Request, res: Response) => {
    try {
      const vendor = await Vendor.findById(req.params.vendorId);
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vendor", error });
    }
  },
  updateVendor: async (req: Request, res: Response) => {
    try {
      const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.vendorId,
        req.body,
        { new: true }
      );
      if (!updatedVendor)
        return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json(updatedVendor);
    } catch (error) {
      res.status(500).json({ message: "Error updating vendor", error });
    }
  },
  deleteVendor: async (req: Request, res: Response) => {
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(req.params.vendorId);
      if (!deletedVendor)
        return res.status(404).json({ message: "Vendor not found" });
      res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting vendor", error });
    }
  },
};

export default vendorControllers;
