import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { articleId: string } }
) => {
  try {
    const { articleId } = await params;
    const article = await prisma.article.findUnique({
      where: { id: articleId[0] },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ result: article }), { status: 200 });
  } catch (err) {
    // console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch the article" }),
      { status: 500 }
    );
  }
};
