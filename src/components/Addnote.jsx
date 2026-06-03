import { useState } from "react";

export default function Addnote({ notes, setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("white");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  function addNote(e) {
    e.preventDefault();

    if (title.length > 100) {
      setError("Title must be less than 100 characters");
      return;
    }

    if (content.trim() === "") {
      setError("Please enter the content");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
      favorite: false,
      category,
      theme,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
    setCategory("");
    setTheme("white");
    setError("");
  }

  return (
    <form onSubmit={addNote} className="space-y-6 text-zinc-100">
      
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

        <input type="text" placeholder="Enter title" value={title}
          onChange={(e) => { setTitle(e.target.value); setError("");}}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500 transition"/>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h1 className="text-sm uppercase tracking-widest text-zinc-400">
          Note
        </h1>

        <textarea placeholder="Type your content..." value={content}
          onChange={(e) => {setContent(e.target.value); setError("");}}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 h-36 outline-none resize-none focus:border-blue-500 transition"
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500 transition"
        >
          <option value="">Select Category</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
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
            className={`w-10 h-10 rounded-full bg-red-500 border-4 transition hover:scale-110 ${
              theme === "red"
                ? "border-white"
                : "border-zinc-700"
            }`}
          />

          <button
            type="button"
            onClick={() => setTheme("green")}
            className={`w-10 h-10 rounded-full bg-green-500 border-4 transition hover:scale-110 
              ${theme === "green" ? "border-white" : "border-zinc-700"}`}
          />

          <button type="button" onClick={() => setTheme("yellow")}
            className={`w-10 h-10 rounded-full bg-yellow-500 border-4 transition hover:scale-110 
              ${theme === "yellow" ? "border-white" : "border-zinc-700"}`}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl p-3 font-semibold tracking-wide shadow-lg"
      >
        Save
      </button>
    </form>
  );
}