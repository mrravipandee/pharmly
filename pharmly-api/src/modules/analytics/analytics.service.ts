import { Bill } from "../bill/bill.model";
import { Types } from "mongoose";

interface DayTotal {
  date: string;
  total: number;
}

export const getTodayTotal = async (
  storeId: Types.ObjectId,
  start: Date,
  end: Date
): Promise<number> => {
  const res = await Bill.aggregate<{ total: number }>([
    {
      $match: {
        storeId,
        status: "active",
        createdAt: { $gte: start, $lt: end }
      }
    },
    { $group: { _id: null, total: { $sum: "$finalAmount" } } }
  ]);
  return res[0]?.total ?? 0;
};

export const getDailyTotals = async (
  storeId: Types.ObjectId,
  start: Date,
  end: Date
): Promise<DayTotal[]> => {
  return Bill.aggregate<DayTotal>([
    {
      $match: {
        storeId,
        status: "active",
        createdAt: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        total: { $sum: "$finalAmount" }
      }
    },
    { $project: { _id: 0, date: "$_id", total: 1 } },
    { $sort: { date: 1 } }
  ]);
};

export const getRecentBills = async (
  storeId: Types.ObjectId,
  limit = 10
) => {
  return Bill.find({ storeId, status: "active" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("finalAmount createdAt customerId")
    .exec();
};
