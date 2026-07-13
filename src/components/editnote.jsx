import axios from "axios";
import { useState } from "react";

export default function EditNote({
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
}) {
  const [title, setTitle] = useState(
    selectedNote.title
  );

  const [content, setContent] = useState(
    selectedNote.content
  );

  const [category, setCategory] =
    useState(selectedNote.category);

  const [theme, setTheme] = useState(
    selectedNote.theme
  );

  const [error, setError] =
    useState("");

  async function updateNote() {
    if (title.length > 100) {
      setError("Title must be less than 100 characters");
      return;
    }

    if (content.trim() === "") {
      setError("Content is required");
      return;
    }

    const updatedNote = {
      ...selectedNote,
      title,
      content,
      category,
      theme,
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.put(
        `http://localhost:3000/notes/${selectedNote.id}`,
        updatedNote
      );

      const res = await axios.get(
        "http://localhost:3000/notes"
      );

      setNotes(res.data);
      setSelectedNote(null);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-6 w-full max-w-md space-y-5 text-zinc-100">

        {/* Heading */}
        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Edit Note
          </h1>

          <button
            onClick={() =>
              setSelectedNote(null)
            }
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        {/* Title */}
        <div className="space-y-2">

          <div className="flex justify-between">

            <label className="text-sm uppercase tracking-widest text-zinc-400">
              Title
            </label>

            <p className="text-xs text-zinc-500">
              {title.length}/100
            </p>

          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Title"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">

          <label className="text-sm uppercase tracking-widest text-zinc-400">
            Content
          </label>

          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
            placeholder="Content"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 h-32 resize-none outline-none focus:border-blue-500 transition"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">

          <label className="text-sm uppercase tracking-widest text-zinc-400">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500 transition"
          >
            <option value="">
              Select Category
            </option>

            <option value="Study">
              Study
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Personal">
              Personal
            </option>
          </select>
        </div>

        {/* Theme */}
        <div className="space-y-3">

          <h1 className="text-sm uppercase tracking-widest text-zinc-400">
            Color Theme
          </h1>

          <div className="flex gap-4">

            <button
              onClick={() =>
                setTheme("red")
              }
              className={`w-10 h-10 rounded-full bg-red-500 border-4 transition hover:scale-110 ${theme === "red"
                ? "border-white"
                : "border-zinc-700"
                }`}
            />

            <button
              onClick={() =>
                setTheme("green")
              }
              className={`w-10 h-10 rounded-full bg-green-500 border-4 transition hover:scale-110 ${theme === "green"
                ? "border-white"
                : "border-zinc-700"
                }`}
            />

            <button
              onClick={() =>
                setTheme("yellow")
              }
              className={`w-10 h-10 rounded-full bg-yellow-400 border-4 transition hover:scale-110 ${theme === "yellow"
                ? "border-white"
                : "border-zinc-700"
                }`}
            />

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={() =>
              setSelectedNote(null)
            }
            className="px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={updateNote}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl font-medium"
          >
            Update
          </button>

        </div>

      </div>
    </div>
  );
}