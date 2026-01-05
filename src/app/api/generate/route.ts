import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const key = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const POST = async (request: Request) => {
  try {
    const { content, title, userId } = await request.json();

    if (!content || !userId || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findFirst({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the article first
    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary: "", // optional, you could generate a summary if needed
        userId: user.id,
      },
    });

    // Ask Gemini to generate quiz questions
    const result = await key.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [
          {
            text: `
Generate 5 multiple-choice quiz questions based on the article below.

Requirements:
- Return EXACT JSON (no markdown, no explanation)
- Each question must have:
  - question (string)
  - options (array of 4 strings)
  - answer (string)

Article:
${content}
            `,
          },
        ],
      },
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No quiz returned from Gemini");
    }

    let quizData: { question: string; options: string[]; answer: string }[];
    try {
      quizData = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid quiz format returned by AI" },
        { status: 500 }
      );
    }

    // Save quizzes in the database
    const createdQuizzes = await Promise.all(
      quizData.map((q) =>
        prisma.quiz.create({
          data: {
            question: q.question,
            options: q.options,
            answer: q.answer,
            articleId: article.id,
          },
        })
      )
    );

    return NextResponse.json(
      {
        article,
        quizzes: createdQuizzes,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
};
