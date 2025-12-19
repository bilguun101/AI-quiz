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
    console.log(result);
    const summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("No summary text returned from Gemini");
    }

    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        summary: summary,
        userId: userId,
      },
    });
    return new Response(JSON.stringify({ result: article }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed", { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
