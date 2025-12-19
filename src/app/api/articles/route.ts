// GET => all articles
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const historyTitle = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ history: historyTitle });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
};
