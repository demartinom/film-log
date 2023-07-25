import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

export default async function FilmLog() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Film Log</h1>
      <div>
        <table className="table w-1/2">
          <thead>
            <tr>
              <th>Film Stock</th>
              <th># of Rolls</th>
              <th>ISO</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>UltraMax</td>
              <td>3</td>
              <td>400</td>
            </tr>
            <tr className="hover">
              <td>Gold</td>
              <td>2</td>
              <td>200</td>
            </tr>
            <tr className="hover">
              <td>Lomo 400</td>
              <td>5</td>
              <td>400</td>
            </tr>
            <tr className="hover">
              <td>Lomo 800</td>
              <td>5</td>
              <td>800</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
