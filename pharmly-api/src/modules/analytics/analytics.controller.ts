import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  getTodayTotal,
  getDailyTotals,
  getRecentBills
} from "./analytics.service";

const startOfDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const endOfDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

export const getTodaySummary = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const storeId = new Types.ObjectId(req.userId);

    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const yest = new Date(today);
    yest.setDate(yest.getDate() - 1);
    const yStart = startOfDay(yest);
    const yEnd = endOfDay(yest);

    const todayTotal = await getTodayTotal(storeId, todayStart, todayEnd);
    const yesterdayTotal = await getTodayTotal(storeId, yStart, yEnd);

    const growthPct =
      yesterdayTotal === 0
        ? todayTotal > 0
          ? 100
          : 0
        : ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;

    return res.json({
      success: true,
      data: {
        todayTotal,
        yesterdayTotal,
        growthPercent: Number(growthPct.toFixed(2))
      }
    });
  } catch {
    return res.status(500).json({ success: false });
  }
};

export const getSalesHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const storeId = new Types.ObjectId(req.userId);

    const from = new Date(String(req.query.from));
    const to = new Date(String(req.query.to));
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid dates" });
    }

    const data = await getDailyTotals(storeId, from, endOfDay(to));
    return res.json({ success: true, data });
  } catch {
    return res.status(500).json({ success: false });
  }
};

export const getOwnerRecentBills = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const storeId = new Types.ObjectId(req.userId);
    const bills = await getRecentBills(storeId, 10);
    return res.json({ success: true, data: bills });
  } catch {
    return res.status(500).json({ success: false });
  }
};
