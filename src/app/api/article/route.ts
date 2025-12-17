import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, content, summary, userId } = body;
  const article = await prisma.article.create({
    data: {
      title: title,
      content: content,
      summary: summary,
      userId: userId,
    },
  });

  return new Response(JSON.stringify({ article }), { status: 201 });
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
