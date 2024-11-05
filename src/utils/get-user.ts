"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./db";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("blogger_token");
    if (!token) return { error: "TokenExpired", user: null };
    const decoded: any = jwt.verify(token.value, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return { error: "TokenExpired", user: null };
    }
    return { error: null, user };
  } catch (error: any) {
    return { error: error.message, user: null };
  }
}
