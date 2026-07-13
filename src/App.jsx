import { useState, useEffect } from "react";
import axios from "axios";
import Addnote from "./components/Addnote";
import Favnote from "./components/favnotes";
import Notelist from "./components/notelist";
import EditNote from "./components/editnote";

function App() {


 const [notes, setNotes] = useState([]);        

  const [selectedNote, setSelectedNote] =
    useState(null);

  useEffect(() => {
  fetchNotes();
}, []);

async function fetchNotes() {
  try {
    const res = await axios.get(
      "http://localhost:3000/notes"
    );

    setNotes(res.data);
  } catch (error) {
    console.error(error);
  }
}

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