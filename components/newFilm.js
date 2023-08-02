"use client";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function NewFilm({ filmData, user }) {
  const [newFilm, setNewFilm] = useState({ user: user });
  function handleFilmChange(field, value) {
    setNewFilm((prevData) => ({ ...prevData, [field]: value }));
  }
  const filmSelectValues = filmData.map((film) => ({
    value: film.name,
    label: film.name,
  }));
  const makerSet = new Set(filmData.map((film) => film.maker.name));
  const makerSelectValues = [...makerSet].map((name) => ({
    value: name,
    label: name,
  }));
  return (
    <>
      <button className="btn" onClick={() => window.addFilm.showModal()}>
        Add a new roll
      </button>
      <dialog id="addFilm" className="modal">
        <form method="dialog" className="max-w-full modal-box">
          <div>
            <h3 className="text-lg font-bold">Add a new film stock</h3>
            <div className="flex">
              <CreatableSelect
                className="input"
                placeholder="Film Stock Name"
                options={filmSelectValues}
              ></CreatableSelect>
              <CreatableSelect
                className="input"
                placeholder="Film Maker"
                options={makerSelectValues}
              ></CreatableSelect>
              <input
                type="number"
                placeholder="ISO"
                className="input"
                onChange={(e) => handleFilmChange("ISO", e.target.value)}
              />
            </div>
            <h3 className="text-lg font-bold">Add a new roll</h3>
            <div className="flex gap-2">
              <input
                type="date"
                placeholder="Date Started"
                className="input"
                onChange={(e) =>
                  handleFilmChange("dateFinished", `${e.target.value} 00:00:00`)
                }
              />
              <input
                type="date"
                placeholder="Date Finished?"
                className="input"
                onChange={(e) =>
                  handleFilmChange(
                    "dateStarted",
                    `${e.target.value ? `${e.target.value} 00:00:00` : null}`
                  )
                }
              />
              <input
                type="text"
                placeholder="Comments?"
                className="input"
                onChange={(e) => handleFilmChange("comments", e.target.value)}
              />
            </div>
            <button className="btn">Add</button>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
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
