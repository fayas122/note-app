import { useState } from "react";
import axios from "axios";

export default function Addnote({ setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("white");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  async function addNote(e) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Please enter a title");
      return;
    }

    if (title.length > 100) {
      setError("Title must be less than 100 characters");
      return;
    }

    if (content.trim() === "") {
      setError("Please enter the content");
      return;
    }

    try {
      const newNote = {
        title,
        content,
        favorite: false,
        archived: false,
        category,
        theme,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axios.post(
        "http://localhost:3000/notes",
        newNote
      );

      const res = await axios.get(
        "http://localhost:3000/notes"
      );

      setNotes(res.data);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setTheme("white");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save note");
    }
  }

  return (
    <form
      onSubmit={addNote}
      className="space-y-6 text-zinc-100"
    >
      {/* Title */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-sm uppercase tracking-widest text-zinc-400">
            Title
          </h1>

          <p className="text-xs text-zinc-500">
            {title.length}/100
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest text-zinc-400">
          Note
        </h1>

        <textarea
          placeholder="Type your content..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError("");
          }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 h-36 resize-none outline-none focus:border-blue-500"
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500"
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
            type="button"
            onClick={() => setTheme("red")}
            className={`w-10 h-10 rounded-full bg-red-500 border-4 ${
              theme === "red"
                ? "border-white"
                : "border-zinc-700"
            }`}
          />

          <button
            type="button"
            onClick={() => setTheme("green")}
            className={`w-10 h-10 rounded-full bg-green-500 border-4 ${
              theme === "green"
                ? "border-white"
                : "border-zinc-700"
            }`}
          />

          <button
            type="button"
            onClick={() => setTheme("yellow")}
            className={`w-10 h-10 rounded-full bg-yellow-500 border-4 ${
              theme === "yellow"
                ? "border-white"
                : "border-zinc-700"
            }`}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl p-3 font-semibold"
      >
        Save Note
      </button>
    </form>
  );
}