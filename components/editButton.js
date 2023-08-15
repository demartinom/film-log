"use client";
import React from "react";
import { FaPenToSquare } from "react-icons/fa6";

export default function EditButton({ rollData }) {
  return (
    <div>
      <FaPenToSquare
        onClick={() => window.editRoll.showModal()}
        className="hover:cursor-pointer"
      />
      <dialog id="editRoll" className="modal">
        <form method="dialog" className="max-w-full modal-box">
          <div>
            <h3 className="text-lg font-bold">Edit Roll</h3>
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
                handleSubmit(e, newRoll);
              }}
            >
              Edit
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
    </div>
  );
}
