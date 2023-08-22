"use client";
import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/navigation";

async function handleSubmit(e, film, setLoading, router) {
  e.preventDefault();
  setLoading(true);
  try {
    await fetch("/api/newfilmstock", {
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

export default function NewFilm({ filmData, user, maker }) {
  const router = useRouter();
  const [newFilm, setNewFilm] = useState({ user: user, color: true });
  const [loading, setLoading] = useState(false);

  function handleFilmChange(field, value) {
    setNewFilm((prevData) => ({ ...prevData, [field]: value }));
  }
  const filmSet = new Set(filmData.map((film) => film.name));
  const filmSelectValues = [...filmSet].map((film) => ({
    value: film,
    label: film,
  }));
  const makerSet = new Set(maker.map((maker) => maker.name));
  const makerSelectValues = [...makerSet].map((name) => ({
    value: name,
    label: name,
  }));

  const formatOptions = [
    { value: "35mm", label: "35mm" },
    { value: "Medium Format", label: "Medium Format" },
    { value: "Large Format", label: "Large Format" },
  ];

  function handleSelectChange(option, keyData) {
    setNewFilm((prevData) => ({ ...prevData, [keyData]: option.value }));
  }

  return (
    <>
      <button className="btn" onClick={() => window.addFilm.showModal()}>
        Add a New Film Stock
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
                onChange={(option) => handleSelectChange(option, "filmName")}
                required
              ></CreatableSelect>
              <CreatableSelect
                className="input"
                placeholder="Film Maker"
                options={makerSelectValues}
                required
                onChange={(option) => handleSelectChange(option, "filmMaker")}
              ></CreatableSelect>
              <input
                type="number"
                placeholder="ISO"
                className="input"
                onChange={(e) => handleFilmChange("ISO", e.target.value)}
                required
              />
              <Select
                className="input"
                placeholder="Format"
                options={formatOptions}
                required
                onChange={(option) => handleSelectChange(option, "format")}
              ></Select>
              <div className="flex items-center">
                <label>Color Film?</label>{" "}
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={newFilm.color}
                  onChange={(e) => handleFilmChange("color", !newFilm.color)}
                />
              </div>
            </div>
            <h3 className="text-lg font-bold">Add a new roll</h3>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <label>Date Started</label>
                <input
                  type="date"
                  placeholder="Date Started"
                  className="input"
                  onChange={(e) =>
                    handleFilmChange(
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
                  onChange={(e) =>
                    handleFilmChange(
                      "dateFinished",
                      `${e.target.value ? `${e.target.value} 00:00:00` : null}`
                    )
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Comments?"
                className="input"
                onChange={(e) => handleFilmChange("comments", e.target.value)}
              />
            </div>
            <button
              className="btn"
              onClick={(e) => {
                handleSubmit(e, newFilm, setLoading, router);
              }}
            >
              {!loading ? (
                "Add"
              ) : (
                <div className=" loading loading-bars loading-md"></div>
              )}
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
