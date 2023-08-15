"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

async function handleSubmit(e, film, router) {
  e.preventDefault();
  window.addFilm.close();
  await fetch("http://localhost:3000/api/newfilmroll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  });
  router.refresh();
}

export default function NewRoll({ user, filmID }) {
  const router = useRouter();

  const [newRoll, setNewRoll] = useState({ user: user, filmStockID: filmID });

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
          <div>
            <h3 className="text-lg font-bold">Add a new film stock</h3>
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
            <button
              className="btn"
              onClick={(e) => {
                handleSubmit(e, newRoll, router);
              }}
            >
              Add
            </button>
          </div>
          <div className="modal-action">
            {/* Button to close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
