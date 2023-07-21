import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

export default async function ExamplePage() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
  }
  return <div>Film Log</div>;
}
