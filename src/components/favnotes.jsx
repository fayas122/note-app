export default function FavoriteNotes({
  notes = [],
}) {
  const favoriteNotes = notes.filter(
    (note) => note.favorite
  );

  return (
    <div className="space-y-5">
      
      {/* Heading */}
      <div className="flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-zinc-100">
          Favorite Notes
        </h1>

      </div>

      {/* Empty State */}
      {favoriteNotes.length === 0 && (
        <div className="text-center py-10 text-zinc-400  rounded-2xl">
          No favorite notes
        </div>
      )}

      {/* Favorite Notes */}
      <div className="grid grid-cols-1 gap-4">
        
        {favoriteNotes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: note.theme,
            }}
            className="p-5 rounded-2xl shadow-lg border border-black/10 text-black space-y-3"
          >
            
            {/* Title */}
            <div className="flex justify-between items-start">
              
              <h2 className="text-lg font-bold break-words">
                {note.title || "Untitled"}
              </h2>

              <span className="text-xl">
                ★
              </span>

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

            {/* Date */}
            <p className="text-xs text-gray-700">
              Updated:{" "}
              {new Date(
                note.updatedAt
              ).toLocaleString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}