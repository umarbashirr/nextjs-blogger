import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { postSchema } from "@/schemas/post";
import { getUser } from "@/utils/get-user";

export async function GET(_request: NextRequest, { params }: { params: any }) {
  try {
    const { postId } = await params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: any }) {
  try {
    const { postId } = await params;
    const body = await request.json();

    const fields = postSchema.parse(body);

    const { user, error } = await getUser();

    if (!user) {
      return NextResponse.json(error, { status: 401 });
    }

    const post = await prisma.post.update({
      where: { id: postId, authorId: user.id },
      data: fields,
    });

    if (!post) {
      return NextResponse.json("Post not found", { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
