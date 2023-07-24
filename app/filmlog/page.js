import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

export default async function FilmLog() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return <div>Film Log</div>;
}
