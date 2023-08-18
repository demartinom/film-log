"use client";
import React, { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";

async function handleSubmit(e, film, router, setChecked, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    await fetch("http://localhost:3000/api/editfilmroll", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
  } finally {
    setChecked(false);
    setLoading(false);
    router.refresh();
  }
}

export default function EditButton({ rollData }) {
  const router = useRouter();
  const editRoll = `editRoll_${rollData.id}`;
  function formatDate(date) {
    return date.toISOString().substring(0, 10);
  }
  const [rollUpdate, setRollUpdate] = useState(rollData);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  function handleRollChange(field, value) {
    setRollUpdate((prevData) => ({ ...prevData, [field]: value }));
  }

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={editRoll}>
        <FaPenToSquare className="hover:cursor-pointer" />
      </label>

      <input
        type="checkbox"
        id={editRoll}
        className="modal-toggle"
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <div className="modal">
        <div className="max-w-full modal-box">
          <div>
            <h3 className="text-lg font-bold">Edit Roll</h3>
            <div className="flex gap-2">
              <div className="flex flex-col items-center">
                <label>Date Started</label>
                <input
                  type="date"
                  placeholder="Date Started"
                  className="input"
                  value={formatDate(rollUpdate.dateStarted)}
                  onChange={(e) =>
                    handleRollChange(
                      "dateStarted",
                      `${e.target.value} 00:00:00`
                    )
                  }
                  required
                />
              </div>
              <div className="flex flex-col items-center">
                <label>Date Finished</label>
                <input
                  type="date"
                  placeholder="Date Finished?"
                  className="input"
                  value={
                    rollData.dateFinished
                      ? formatDate(rollUpdate.dateFinished)
                      : null
                  }
                  onChange={(e) =>
                    handleRollChange(
                      "dateFinished",
                      `${e.target.value ? `${e.target.value} 00:00:00` : null}`
                    )
                  }
                />
              </div>
              <div className="flex flex-col items-center">
                <label>Comments</label>
                <input
                  type="text"
                  placeholder="Comments?"
                  className="input"
                  value={rollUpdate.comments ?? ""}
                  onChange={(e) => handleRollChange("comments", e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn"
              onClick={(e) => {
                handleSubmit(e, rollUpdate, router, setChecked, setLoading);
              }}
            >
              {!loading ? (
                "Edit"
              ) : (
                <div className=" loading loading-bars loading-md"></div>
              )}
            </button>
          </div>
          <div className="modal-action">
            {/* Button to close the modal */}
            <label htmlFor={editRoll} className="btn">
              Close
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={editRoll}>
          Close
        </label>
      </div>
    </div>
  );
}
