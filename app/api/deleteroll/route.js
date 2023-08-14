import React from "react";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request) {
  try {
    const rollID = await request.json();
    await prisma.roll.delete({ where: { id: rollID } });
    return NextResponse.json({ message: "roll deleted" });
  } finally {
    await prisma.$disconnect();
  }
}
