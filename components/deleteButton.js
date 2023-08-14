"use client";
import React from "react";
import { FaDeleteLeft } from "react-icons/fa6";

async function deleteRoll(rollID) {
  await fetch("http://localhost:3000/api/deleteroll", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rollID),
  });
}

export default function DeleteButton({ rollID }) {
  return (
    <button>
      <FaDeleteLeft onClick={() => deleteRoll(rollID)} />
    </button>
  );
}
