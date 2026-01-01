import jwt from "jsonwebtoken";

interface JwtPayload {
  storeId: string;
}

export const signToken = (payload: JwtPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};
