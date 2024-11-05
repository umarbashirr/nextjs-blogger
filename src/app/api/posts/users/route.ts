import prisma from "@/utils/db";
import { getUser } from "@/utils/get-user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const {error, user} = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: error,
        },
        { status: 404 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
