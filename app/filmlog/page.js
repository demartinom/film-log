import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import NewFilm from "@/components/newFilm";

const prisma = new PrismaClient();

async function getFilm(user) {
  try {
    const rollData = await prisma.roll.groupBy({
      by: ["filmStockId"],
      _count: { filmStockId: true },
    });
    const filmData = await prisma.filmStock.findMany({
      include: {
        Roll: { where: { user: user } },
        maker: true,
      },
    });
    return { rollCount: rollData, film: filmData };
  } finally {
    await prisma.$disconnect();
  }
}

export default async function FilmLog() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const filmData = await getFilm(session.user.email);
  return (
    <div>
      <h1>Film Log</h1>
      <div>
        <table className="table w-1/2">
          <thead>
            <tr>
              <th>Film Stock</th>
              <th># of Rolls</th>
              <th>Film Maker</th>
              <th>ISO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filmData.film.map(
              (film) =>
                film.Roll.length > 0 && (
                  <tr className="hover" key={film.id}>
                    <td>{film.name}</td>
                    <td>
                      {
                        film.Roll.filter(
                          (filmStock) => filmStock.filmStockId == film.id
                        ).length
                      }
                    </td>
                    <td>{film.maker.name}</td>
                    <td>{film.ISO}</td>
                    <td>See your rolls</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <NewFilm filmData={filmData.film} user={session.user.email} />
      </div>
    </div>
  );
}
