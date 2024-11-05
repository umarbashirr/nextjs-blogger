import { postSchema } from "@/schemas/post";
import prisma from "@/utils/db";
import { getUser } from "@/utils/get-user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fields = postSchema.safeParse(body);
    if (!fields.success) {
      return NextResponse.json(
        {
          message: "Invalid fields",
        },
        { status: 400 }
      );
    }
    const { error, user } = await getUser();
    if (!user) {
      return NextResponse.json(
        {
          message: error,
        },
        { status: 401 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...fields.data,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return NextResponse.json(
      {
        post,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
