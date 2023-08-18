"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="absolute btn btn-md top-3"
      onClick={() => router.push("/filmlog")}
    >
      Return to Film Log
    </button>
  );
}
