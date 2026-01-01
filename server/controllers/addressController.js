// Add Address : /api/address/add
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;          // ✅ from auth middleware
    const { address } = req.body;

    await Address.create({ ...address, userId });

    res.status(201).json({
      success: true,
      message: "Address added successfully"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add address"
    });
  }
};

// Get Address : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;          // ✅ from auth middleware

    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      addresses
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses"
    });
  }
};
