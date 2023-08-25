import React from "react";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import NewRoll from "@/components/newRoll";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import { redirect } from "next/navigation";
import BackButton from "@/components/backButton";
import prisma from "@/helper-functions/prisma";

async function getFilm(session, filmID) {
  try {
    const data = await prisma.roll.findMany({
      where: {
        user: session.user.email,
        filmStockId: filmID,
      },
      include: { film: true, maker: true },
      orderBy: { id: "asc" },
    });
    return data.length == 0 ? redirect("/filmlog") : data;
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
    <div className="relative px-5 mt-5">
      <BackButton />
      <h1 className="pt-3 mb-10 text-3xl text-center">
        {data[0].maker.name} {data[0].film.name} {data[0].ISO}
      </h1>
      <h1>fdklj</h1>
      <div className="overflow-x-auto">
        <table className="table text-center md:table-md table-xs">
          <thead>
            <tr>
              <th>Roll #</th>
              <th>Date Started</th>
              <th>Date Finished</th>
              <th>Comments</th>
              <th></th>
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
                <td className="flex items-center gap-1">
                  <EditButton rollData={roll} />
                  <DeleteButton rollID={roll.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewRoll user={session.user.email} filmID={filmstockid} />
    </div>
  );
}
