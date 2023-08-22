"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

async function handleSubmit(e, film, router, setLoading) {
  try {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/newfilmroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
  } finally {
    window.addFilm.close();
    setLoading(false);
    router.refresh();
  }
}

export default function NewRoll({ user, filmID }) {
  const router = useRouter();

  const [newRoll, setNewRoll] = useState({ user: user, filmStockID: filmID });
  const [loading, setLoading] = useState(false);
  function handleRollChange(field, value) {
    setNewRoll((prevData) => ({ ...prevData, [field]: value }));
  }
  //TODO: Refactor with newFilm and/or edit form
  return (
    <>
      <button className="btn" onClick={() => window.addFilm.showModal()}>
        Add a New Roll
      </button>
      <dialog id="addFilm" className="modal">
        <form method="dialog" className="max-w-full modal-box">
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
            ✕
          </button>
          <div>
            <h3 className="text-lg font-bold">Add a new roll</h3>
            <div className="flex gap-2">
              <input
                type="date"
                placeholder="Date Started"
                className="input"
                onChange={(e) =>
                  handleRollChange("dateStarted", `${e.target.value} 00:00:00`)
                }
                required
              />
              <input
                type="date"
                placeholder="Date Finished?"
                className="input"
                onChange={(e) =>
                  handleRollChange(
                    "dateFinished",
                    `${e.target.value ? `${e.target.value} 00:00:00` : null}`
                  )
                }
              />
              <input
                type="text"
                placeholder="Comments?"
                className="input"
                onChange={(e) => handleRollChange("comments", e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action">{/* Button to close the modal */}</div>
          <button
            className="btn"
            onClick={(e) => {
              handleSubmit(e, newRoll, router, setLoading);
            }}
          >
            {!loading ? (
              "Add Roll"
            ) : (
              <div className=" loading loading-bars loading-md"></div>
            )}
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
