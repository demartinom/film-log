import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const req = await request.json();
    let filmMaker = await prisma.filmMaker.findUnique({
      where: {
        name: req.filmMaker,
      },
    });

    if (!filmMaker) {
      filmMaker = await prisma.filmMaker.create({
        data: { name: req.filmMaker },
      });
    }
    const data = await prisma.roll.create({
      data: {
        maker: {
          connect: {
            id: filmMaker.id, // Use createdFilmMaker.id to connect
          },
        },
        film: {
          connectOrCreate: {
            where: {
              name_ISO_format: {
                name: req.filmName,
                ISO: parseInt(req.ISO),
                format: req.format,
              },
            },
            create: {
              name: req.filmName,
              ISO: parseInt(req.ISO),
              color: req.color,
              maker: { connect: { id: filmMaker.id } }, // Use createdFilmMaker.id to connect
              format: req.format,
            },
          },
        },
        dateStarted: new Date(req.dateStarted).toISOString(),
        dateFinished: req.dateFinished
          ? new Date(req.dateFinished).toISOString()
          : null,
        comments: req.comments ?? null,
        user: req.user,
      },
    });
    return NextResponse.json(data);
  } finally {
    await prisma.$disconnect();
  }
}
