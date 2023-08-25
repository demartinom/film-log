"use client";
import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

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
      <button
        className="hidden btn md:inline-flex"
        onClick={() => window.addFilm.showModal()}
      >
        New Film Stock
      </button>
      <button
        className="btn btn-sm md:hidden"
        onClick={() => window.addFilm.showModal()}
      >
        <FaPlus />
      </button>
      <dialog id="addFilm" className="modal">
        <form method="dialog" className="max-w-full modal-box">
          <div>
            <h3 className="text-lg font-bold">Add a new film stock</h3>
            <div className="flex flex-col gap-5 md:flex-row">
              <div>
                <label className="label">
                  <span className="label-text">Film Stock</span>
                </label>
                <CreatableSelect
                  className="p-0 input"
                  placeholder="Film Stock Name"
                  options={filmSelectValues}
                  onChange={(option) => handleSelectChange(option, "filmName")}
                  required
                ></CreatableSelect>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Film Maker</span>
                </label>
                <CreatableSelect
                  className="p-0 input"
                  placeholder="Film Maker"
                  options={makerSelectValues}
                  required
                  onChange={(option) => handleSelectChange(option, "filmMaker")}
                ></CreatableSelect>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">ISO</span>
                </label>
                <input
                  type="number"
                  placeholder="ISO"
                  className="w-24 input input-bordered"
                  onChange={(e) => handleFilmChange("ISO", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Format</span>
                </label>
                <Select
                  className="p-0 input"
                  placeholder="Format"
                  options={formatOptions}
                  required
                  onChange={(option) => handleSelectChange(option, "format")}
                ></Select>
              </div>
              <div className="">
                <label className="flex flex-col items-start gap-3 label">
                  <span className="label-text">Color Film?</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={newFilm.color}
                    onChange={(e) => handleFilmChange("color", !newFilm.color)}
                  />
                </label>
              </div>
            </div>
            <h3 className="text-lg font-bold">Add a new roll</h3>
            <div className="flex flex-col items-start gap-2 md:items-center md:flex-row">
              <div className="flex flex-col items-start md:items-center">
                <label>Date Started</label>
                <input
                  type="date"
                  placeholder="Date Started"
                  className="input input-bordered"
                  onChange={(e) =>
                    handleFilmChange(
                      "dateStarted",
                      `${e.target.value} 00:00:00`
                    )
                  }
                  required
                />
              </div>
              <div className="flex flex-col items-start md:items-center">
                <label>Date Finished</label>
                <input
                  type="date"
                  placeholder="Date Finished?"
                  className="input input-bordered"
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
                className="input input-bordered"
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
