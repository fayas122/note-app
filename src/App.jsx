import { useState, useEffect } from "react";

import Addnote from "./components/Addnote";
import Favnote from "./components/favnotes";
import Notelist from "./components/notelist";
import EditNote from "./components/editnote";

function App() {

  // Load notes from localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes =
      localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });         

  const [selectedNote, setSelectedNote] =
    useState(null);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 p-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Note */}
        <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-6 text-zinc-100">
          <Addnote notes={notes} setNotes={setNotes}/>
        </div>

        {/* Note List */}
        <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-6 text-zinc-100">
          <Notelist notes={notes} setNotes={setNotes} setSelectedNote={setSelectedNote}/>
        </div>

        {/* Favourite Notes */}
        <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-6 text-zinc-100">
          <Favnote notes={notes} />
        </div>

      </div>

      {/* Edit Modal */}
      {selectedNote && (
        <EditNote selectedNote={selectedNote} notes={notes} setNotes={setNotes} setSelectedNote={setSelectedNote} />)}
    </div>
  );
}

export default App;