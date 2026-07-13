import axios from "axios";
import { useState } from "react";

export default function NotesList({
  notes,
  setNotes,
  setSelectedNote,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedNotes, setSelectedNotes] =
    useState([]);

  async function toggleFav(id) {
    const note = notes.find(
      (note) => note.id === id
    );

    await axios.patch(
      `http://localhost:3000/notes/${id}`,
      {
        favorite: !note.favorite,
        updatedAt: new Date().toISOString(),
      }
    );

    const res = await axios.get(
      "http://localhost:3000/notes"
    );

    setNotes(res.data);
  }

  function toggleSelect(id) {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(
        selectedNotes.filter(
          (noteId) => noteId !== id
        )
      );
    } else {
      setSelectedNotes([
        ...selectedNotes,
        id,
      ]);
    }
  }

  async function deleteSelectedNotes() {
    try {
      await Promise.all(
        selectedNotes.map((id) =>
          axios.delete(
            `http://localhost:3000/notes/${id}`
          )
        )
      );

      const res = await axios.get(
        "http://localhost:3000/notes"
      );

      setNotes(res.data);
      setSelectedNotes([]);
    } catch (error) {
      console.error(error);
    }
  }
  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(
          b.title
        );
      }

      if (sortBy === "date") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      if (sortBy === "color") {
        return a.theme.localeCompare(
          b.theme
        );
      }

      return 0;
    }
  );

  return (
    <div className="space-y-5 w-full">
      {/* Search + Sort */}
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-blue-500 w-full"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-blue-500"
        >
          <option value="">
            Sort By
          </option>

          <option value="title">
            Title
          </option>

          <option value="date">
            Date
          </option>

          <option value="color">
            Color
          </option>
        </select>

        {selectedNotes.length > 0 && (
          <button
            onClick={deleteSelectedNotes}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition"
          >
            Delete
          </button>
        )}
      </div>

      {/* Empty State */}
      {sortedNotes.length === 0 && (
        <div className="text-center text-zinc-400 py-10">
          No notes found
        </div>
      )}

      {/* Notes */}
      <div className="flex flex-col gap-5 w-full">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: note.theme,
            }}
            className="p-5 rounded-2xl shadow-lg border border-black/10 space-y-4 text-black w-full"
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-3">


                <h2 className="text-xl font-bold break-words">
                  {note.title || "Untitled"}
                </h2>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() =>
                    toggleFav(note.id)
                  }
                  className="bg-white px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 transition"
                >
                  {note.favorite
                    ? "★"
                    : "☆"}
                </button>

                <button
                  onClick={() =>
                    setSelectedNote(note)
                  }
                  className="bg-white px-3 py-1 rounded-lg text-sm font-medium hover:scale-105 transition"
                >
                  Edit
                </button>
                <input
                  type="checkbox"
                  checked={selectedNotes.includes(
                    note.id
                  )}
                  onChange={() =>
                    toggleSelect(note.id)
                  }
                  className="mt-1 w-4 h-4"
                />
              </div>
            </div>

            {/* Content */}
            <p className="break-words">
              {note.content}
            </p>

            {/* Category */}
            {note.category && (
              <p className="text-sm font-medium">
                Category: {note.category}
              </p>
            )}

            {/* Dates */}
            <div className="text-xs text-gray-700 space-y-1">
              <p>
                Created:{" "}
                {new Date(
                  note.createdAt
                ).toLocaleString()}
              </p>

              <p>
                Updated:{" "}
                {new Date(
                  note.updatedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
