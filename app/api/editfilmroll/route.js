import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request) {
  try {
    const filmRoll = await request.json();
    await prisma.roll.update({
      where: { id: filmRoll.id },
      data: {
        dateStarted: filmRoll.dateStarted,
        dateFinished: filmRoll.dateFinished,
        comments: filmRoll.comments,
      },
    });
    return new Response("Update successful", { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
}
