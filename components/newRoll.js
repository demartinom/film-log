"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
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
      <button
        className="hidden mt-2 btn md:inline-flex"
        onClick={() => window.addFilm.showModal()}
      >
        Add a New Roll
      </button>
      <button
        className="mt-2 btn btn-sm md:hidden"
        onClick={() => window.addFilm.showModal()}
      >
        <FaPlus />
      </button>
      <dialog id="addFilm" className="modal">
        <form method="dialog" className="max-w-full modal-box">
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
            ✕
          </button>
          <div>
            <h3 className="text-lg font-bold">Add a new roll</h3>
            <div className="flex flex-col gap-2 md:flex-row">
              <div>
                <label className="label">
                  <span className="label-text">Date Started</span>
                </label>
                <input
                  type="date"
                  placeholder="Date Started"
                  className="input input-bordered"
                  onChange={(e) =>
                    handleRollChange(
                      "dateStarted",
                      `${e.target.value} 00:00:00`
                    )
                  }
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    Date Finished (if applicable)
                  </span>
                </label>
                <input
                  type="date"
                  placeholder="Date Finished?"
                  className="input input-bordered"
                  onChange={(e) =>
                    handleRollChange(
                      "dateFinished",
                      `${e.target.value ? `${e.target.value} 00:00:00` : null}`
                    )
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Comments?</span>
                </label>
                <input
                  type="text"
                  placeholder="Write comments here"
                  className="input input-bordered"
                  onChange={(e) => handleRollChange("comments", e.target.value)}
                />
              </div>
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
