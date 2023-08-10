import React from "react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import NewRoll from "@/components/newRoll";

const prisma = new PrismaClient();

async function getFilm(session, filmID) {
  try {
    const data = await prisma.roll.findMany({
      where: {
        user: session.user.email,
        filmStockId: filmID,
      },
      include: { film: true, maker: true },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
}
function convertDate(date) {
  return new Date(date).toLocaleDateString("en-US");
}

export default async function FilmStock({ params: { filmstockid } }) {
  const session = await getServerSession(OPTIONS);
  const data = await getFilm(session, parseInt(filmstockid));

  return (
    <div>
      <h1 className="text-center">
        {data[0].maker.name} {data[0].film.name}
      </h1>
      <NewRoll />
      <table className="table">
        <thead>
          <tr>
            <th>Roll #</th>
            <th>Date Started</th>
            <th>Date Finished</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((roll) => (
            <tr key={roll.id}>
              <th>{data.indexOf(roll) + 1}</th>
              <td>{convertDate(roll.dateStarted)}</td>
              <td>
                {roll.dateFinished
                  ? convertDate(roll.dateFinished)
                  : "In Progress"}
              </td>
              <td>{roll.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}