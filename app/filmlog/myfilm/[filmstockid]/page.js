import React from "react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function getFilm(session, filmID) {
  const data = await prisma.roll.findMany({
    where: {
      user: session.user.email,
      filmStockId: filmID,
    },
    include: { film: true, maker: true },
  });
  return data;
}

export default async function FilmStock({ params: { filmstockid } }) {
  const session = await getServerSession(OPTIONS);
  const data = await getFilm(session, parseInt(filmstockid));
  return <div>FilmStock</div>;
}
