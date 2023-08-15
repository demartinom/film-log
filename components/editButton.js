"use client";
import React from "react";
import { FaPenToSquare } from "react-icons/fa6";

export default function EditButton({ rollData }) {
  const editRoll = `editRoll_${rollData.id}`;
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor={editRoll}>
        <FaPenToSquare className="hover:cursor-pointer" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={editRoll} className="modal-toggle" />
      <div className="modal">
        <div className="max-w-full modal-box">
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
