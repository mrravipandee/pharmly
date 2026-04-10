import { Request, Response } from "express";
import { createStore, validatePassword } from "./store.service";
import { Store } from "./store.model";
import { signToken } from "../../utils/jwt";
import { Types } from "mongoose";

export const registerStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const store = await createStore(req.body);

    const token = signToken({ storeId: store._id.toString() });

    return res.status(201).json({
      success: true,
      token,
      store: {
        id: store._id,
        name: store.name,
        whatsappNumber: store.whatsappNumber,
        secondaryMobileNumber: store.secondaryMobileNumber,
        gstNumber: store.gstNumber,
        address: store.address,
        city: store.city,
        discountPercent: store.discountPercent
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false });
  }
};

export const loginStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { whatsappNumber, password } = req.body;

    const store = await Store.findOne({ whatsappNumber });
    if (!store) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isValid = await validatePassword(password, store.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken({ storeId: store._id.toString() });

    return res.json({
      success: true,
      token,
      store: {
        id: store._id,
        name: store.name,
        whatsappNumber: store.whatsappNumber,
        secondaryMobileNumber: store.secondaryMobileNumber,
        gstNumber: store.gstNumber,
        address: store.address,
        city: store.city,
        discountPercent: store.discountPercent
      }
    });
  } catch (error: unknown) {
    return res.status(500).json({ success: false });
  }
};

export const getStoreDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const storeId = new Types.ObjectId(req.userId);
    const store = await Store.findById(storeId).select("-password");

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    return res.json({
      success: true,
      store: {
        id: store._id,
        name: store.name,
        whatsappNumber: store.whatsappNumber,
        secondaryMobileNumber: store.secondaryMobileNumber,
        gstNumber: store.gstNumber,
        address: store.address,
        city: store.city,
        discountPercent: store.discountPercent
      }
    });
  } catch (error) {
    console.error("Error fetching store details:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch store details" });
  }
};

export const updateStoreDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const storeId = new Types.ObjectId(req.userId);
    const { name, whatsappNumber, secondaryMobileNumber, gstNumber, address, city, discountPercent } = req.body;

    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      {
        name,
        whatsappNumber,
        secondaryMobileNumber,
        gstNumber,
        address,
        city,
        discountPercent
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStore) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    return res.json({
      success: true,
      store: {
        id: updatedStore._id,
        name: updatedStore.name,
        whatsappNumber: updatedStore.whatsappNumber,
        secondaryMobileNumber: updatedStore.secondaryMobileNumber,
        gstNumber: updatedStore.gstNumber,
        address: updatedStore.address,
        city: updatedStore.city,
        discountPercent: updatedStore.discountPercent
      }
    });
  } catch (error) {
    console.error("Error updating store details:", error);
    return res.status(500).json({ success: false, message: "Failed to update store details" });
  }
};

export const deleteStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { whatsappNumber, password } = req.body;

    if (!whatsappNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "WhatsApp number and password are required"
      });
    }

    const store = await Store.findOne({ whatsappNumber });
    if (!store) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isValid = await validatePassword(password, store.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const deletedStore = await Store.findByIdAndDelete(store._id);

    return res.json({
      success: true,
      message: "Store deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting store:", error);
    return res.status(500).json({ success: false, message: "Failed to delete store" });
  }
};