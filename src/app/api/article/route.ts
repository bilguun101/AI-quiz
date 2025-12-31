import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const key = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const POST = async (request: Request) => {
  try {
    const { title, content, userId } = await request.json();

    if (!title || !content || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { clerkId: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await key.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [
          {
            text: `Summarize the following article in 3-4 sentences:\n\n${content}`,
          },
        ],
      },
    });
    const summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("No summary text returned from Gemini");
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        userId: user.id,
      },
    });
    return new Response(JSON.stringify({ result: article }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed", { status: 400 });
  }
};
