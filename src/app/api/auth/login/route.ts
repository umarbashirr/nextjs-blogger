import { loginSchema } from "@/schemas/auth";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fields = loginSchema.safeParse(body);

    if (!fields.success) {
      return NextResponse.json(fields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    const { email, password } = fields.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    };

    const cookiStore = await cookies();

    cookiStore.set("blogger_token", token, cookieOptions);

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(error.message, { status: 500 });
  }
}
