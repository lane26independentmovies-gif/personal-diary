import { useState, useEffect } from "react";
import Header from "./components/Header";
import EntryCard from "./components/EntryCard";
import AddEntryModal from "./components/AddEntryModal";
import ViewEntryModal from "./components/ViewEntryModal";

function App() {
  const [entries, setEntries] = useState(() => {
    try {
      const savedEntries = localStorage.getItem("diaryEntries");

      if (!savedEntries) {
        return [];
      }

      const parsedEntries = JSON.parse(savedEntries);

      return Array.isArray(parsedEntries) ? parsedEntries : [];
    } catch (error) {
      console.error("Matrix error:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);

  function handleAddEntry(newEntry) {
    const entryWithId = {
      ...newEntry,
      id: crypto.randomUUID(),
    };

    setEntries((currentEntries) => [...currentEntries, entryWithId]);
  }

  function handleUpdateEntry(updatedEntry) {
    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );

    setEditingEntry(null);
  }

  function handleAddUpdate(entryId, updateText) {
    const newUpdate = {
      id: crypto.randomUUID(),
      content: updateText,
      createdAt: new Date().toISOString(),
    };

    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              updates: [...(entry.updates || []), newUpdate],
            }
          : entry,
      ),
    );

    setSelectedEntry((currentEntry) => {
      if (!currentEntry || currentEntry.id !== entryId) {
        return currentEntry;
      }

      return {
        ...currentEntry,
        updates: [...(currentEntry.updates || []), newUpdate],
      };
    });
  }

  function handleDeleteUpdate(entryId, updateId) {
    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              updates: (entry.updates || []).filter(
                (update) => update.id !== updateId,
              ),
            }
          : entry,
      ),
    );

    setSelectedEntry((currentEntry) => {
      if (!currentEntry || currentEntry.id !== entryId) {
        return currentEntry;
      }

      return {
        ...currentEntry,
        updates: (currentEntry.updates || []).filter(
          (update) => update.id !== updateId,
        ),
      };
    });
  }

  function handleEditUpdate(entryId, updateId, newContent) {
    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              updates: (entry.updates || []).map((update) =>
                update.id === updateId
                  ? {
                      ...update,
                      content: newContent,
                      editedAt: new Date().toISOString(),
                    }
                  : update,
              ),
            }
          : entry,
      ),
    );

    setSelectedEntry((currentEntry) => {
      if (!currentEntry || currentEntry.id !== entryId) {
        return currentEntry;
      }

      return {
        ...currentEntry,
        updates: (currentEntry.updates || []).map((update) =>
          update.id === updateId
            ? {
                ...update,
                content: newContent,
                editedAt: new Date().toISOString(),
              }
            : update,
        ),
      };
    });
  }

  function handleDeleteEntry(entryToDelete) {
    const confirmed = window.confirm(
      `Delete "${entryToDelete.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryToDelete.id),
    );
    setSelectedEntry(null);
  }
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/diary-background.png')",
      }}
    >
      <div className="min-h-screen bg-black/20">
        <Header onAddEntry={() => setIsAddModalOpen(true)} />
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <h2 className="mb-6 text-3xl font-semibold text-white">The Matrix</h2>

          {entries.length === 0 && (
            <p className="rounded-2xl border border-rose-300/40 bg-black/60 p-6 text-white/80">
              Your brain 🧠 is empty. Please insert a coin 😝 to Click “Add
              Entry” and create your first memory.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                title={entry.title}
                date={entry.date}
                createdAt={entry.createdAt}
                imageUrl={entry.imageUrl}
                content={entry.content}
                onClick={() => setSelectedEntry(entry)}
              />
            ))}
          </div>
        </section>

        {isAddModalOpen && (
          <AddEntryModal
            onClose={() => {
              setIsAddModalOpen(false);
              setEditingEntry(null);
            }}
            onAddEntry={handleAddEntry}
            onUpdateEntry={handleUpdateEntry}
            editingEntry={editingEntry}
          />
        )}

        {selectedEntry && (
          <ViewEntryModal
            entry={selectedEntry}
            onClose={() => setSelectedEntry(null)}
            onDelete={() => handleDeleteEntry(selectedEntry)}
            onAddUpdate={(updateText) => {
              handleAddUpdate(selectedEntry.id, updateText);
            }}
            onDeleteUpdate={(updateId) => {
              handleDeleteUpdate(selectedEntry.id, updateId);
            }}
            onEditUpdate={(updateId, newContent) => {
              handleEditUpdate(selectedEntry.id, updateId, newContent);
            }}
            onEdit={() => {
              setEditingEntry(selectedEntry);
              setSelectedEntry(null);
              setIsAddModalOpen(true);
            }}
          />
        )}
      </div>
    </main>
  );
}

export default App;
