import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const NotesContext = createContext();

const API_URL = "http://localhost:3000/notes";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState(null);

  // Fetch Notes
  async function fetchNotes() {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      setNotes(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }

  // Create Note
  async function createNote(note) {
    try {
      const newNote = {
        ...note,
        createdAt:
          new Date().toISOString(),
        updatedAt:
          new Date().toISOString(),
      };

      await axios.post(
        API_URL,
        newNote
      );

      fetchNotes();
    } catch (err) {
      setError("Failed to create note");
    }
  }

  // Update Note
  async function updateNote(
    id,
    updates
  ) {
    try {
      await axios.patch(
        `${API_URL}/${id}`,
        {
          ...updates,
          updatedAt:
            new Date().toISOString(),
        }
      );

      fetchNotes();
    } catch (err) {
      setError("Failed to update note");
    }
  }

  // Delete Note
  async function deleteNote(id) {
    try {
      await axios.delete(
        `${API_URL}/${id}`
      );

      fetchNotes();
    } catch (err) {
      setError("Failed to delete note");
    }
  }

  // Toggle Archive
  async function toggleArchive(id) {
    try {
      const note = notes.find(
        (n) => n.id === id
      );

      if (!note) return;

      await axios.patch(
        `${API_URL}/${id}`,
        {
          archived:
            !note.archived,
          updatedAt:
            new Date().toISOString(),
        }
      );

      fetchNotes();
    } catch (err) {
      setError("Failed to archive note");
    }
  }

  // Search Notes
  function searchNotes(query) {
    return notes.filter(
      (note) =>
        note.title
          ?.toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        note.content
          ?.toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        createNote,
        updateNote,
        deleteNote,
        toggleArchive,
        searchNotes,
        fetchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}