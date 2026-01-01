import { Request, Response } from "express";
import { createStore, validatePassword } from "./store.service";
import { Store } from "./store.model";
import { signToken } from "../../utils/jwt";

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
        whatsappNumber: store.whatsappNumber
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
        whatsappNumber: store.whatsappNumber
      }
    });
  } catch (error: unknown) {
    return res.status(500).json({ success: false });
  }
};
