import { NextResponse } from "next/server";
import prisma from "@/helper-functions/prisma";

export async function POST(request) {
  try {
    const req = await request.json();
    let filmStock = await prisma.filmStock.findUnique({
      where: { id: parseInt(req.filmStockID) },
      include: { maker: true },
    });
    const data = await prisma.roll.create({
      data: {
        film: { connect: { id: filmStock.id } },
        maker: { connect: { id: filmStock.maker.id } },
        user: req.user,
        dateStarted: new Date(req.dateStarted).toISOString(),
        dateFinished: req.dateFinished
          ? new Date(req.dateFinished).toISOString()
          : null,
        comments: req.comments ?? null,
      },
    });
    return NextResponse.json(data);
  } finally {
    await prisma.$disconnect();
  }
}
