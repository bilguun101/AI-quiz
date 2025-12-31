import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const { email, name, clerkId } = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (existingUser) {
      return new Response(JSON.stringify(existingUser), {
        status: 200,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
      },
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
};
