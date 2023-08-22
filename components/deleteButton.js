"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

export default function DeleteButton({ rollID }) {
  const router = useRouter();
  async function deleteRoll(rollID) {
    try {
      setWait(true);
      await fetch("/api/deleteroll", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rollID),
      });
    } finally {
      setAlertState(true);
      setTimeout(() => {
        setAlertState(false);
        router.refresh();
      }, 2000);
    }
  }
  const [alertState, setAlertState] = useState(false);
  const [wait, setWait] = useState(false);
  return (
    <>
      {wait && (
        <div
          className={`absolute -top-16 -right-44 alert alert-success ${
            alertState ? "opacity-100" : "opacity-0"
          } transition-all duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Roll Deleted!</span>
        </div>
      )}
      <button>
        <FaDeleteLeft onClick={() => deleteRoll(rollID)} />
      </button>
    </>
  );
}
