"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="absolute hidden btn btn-md md:inline-flex"
        onClick={() => router.push("/filmlog")}
      >
        Return to Film Log
      </button>
      <button
        type="button"
        className="absolute btn btn-sm md:hidden"
        onClick={() => router.push("/filmlog")}
      >
        <FaArrowLeft />
      </button>
    </>
  );
}
