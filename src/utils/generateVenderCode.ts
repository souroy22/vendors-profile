import slugify from "slugify";
import ShortUniqueId from "short-uuid";
import Vendor from "../models/vendor.model";

// Initialize the ShortUniqueId generator
const shortUUID = ShortUniqueId();

export const generateVendorCode = async (name: string): Promise<string> => {
  const nameWithoutSpaces = name.replace(/\s+/g, "");

  // Generate a slug and remove any special characters
  let vendorCode = slugify(nameWithoutSpaces, {
    replacement: "", // Replace spaces with nothing
    remove: /[*+~.()'"!:@]/g, // Remove special characters
    lower: true, // Convert to lowercase
  });
  const existingVendor = await Vendor.findOne({ vendorCode });

  // If the vendorCode exists, append a short UUID
  if (existingVendor) {
    vendorCode = await `${vendorCode}-${shortUUID.generate()}`;
  }

  vendorCode = vendorCode;

  return vendorCode;
};
