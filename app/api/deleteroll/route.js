import React from "react";
import { NextResponse } from "next/server";
import prisma from "@/helper-functions/prisma";

export async function DELETE(request) {
  try {
    const rollID = await request.json();
    await prisma.roll.delete({ where: { id: rollID } });
    return NextResponse.json({ message: "roll deleted" });
  } finally {
    await prisma.$disconnect();
  }
}
