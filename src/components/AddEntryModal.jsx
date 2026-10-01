import { useState } from "react";

function AddEntryModal({ onClose, onAddEntry, onUpdateEntry, editingEntry }) {
  const [title, setTitle] = useState(editingEntry ? editingEntry.title : "");
  const [date] = useState(() =>
    editingEntry ? editingEntry.date : new Date().toLocaleDateString("en-CA"),
  );
  const [imageUrl, setImageUrl] = useState(
    editingEntry ? editingEntry.imageUrl : "",
  );
  const [content, setContent] = useState(
    editingEntry ? editingEntry.content : "",
  );
  const [error, setError] = useState("");


  function handleSubmit(event) {
  event.preventDefault()

  if (!title.trim() || !content.trim()) {
    setError("Please enter a title and some content.");
    return;
  }

  setError("");

  if (editingEntry) {
    const updatedEntry = {
      ...editingEntry,
      title: title,
      imageUrl: imageUrl,
      content: content,
    }

    onUpdateEntry(updatedEntry)
  } else {
    const newEntry = {
      title: title,
      date: date,
      imageUrl: imageUrl,
      content: content,
      createdAt: new Date().toISOString(),
    }

    onAddEntry(newEntry)
    }

    onClose()
    }

    
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-2xl border border-rose-300/50 bg-slate-950/95 p-8 shadow-[0_0_30px_rgba(251,113,133,0.35)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-white">
            {editingEntry ? "Edit Entry" : "Add New Entry"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-white/60 transition hover:text-rose-300"
          >
            ✕
          </button>
        </div>

        <p className="text-white/60">Create a new memory for your diary.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="My diary entry..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-rose-300"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              value={date}
              readOnly
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-rose-300"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Image URL
            </label>

            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-rose-300"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Content
            </label>

            <textarea
              id="content"
              rows="5"
              placeholder="What happened today?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-rose-300"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/20 px-5 py-3 font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg border border-rose-300/60 bg-rose-500 px-5 py-3 font-semibold text-white shadow-[0_0_12px_rgba(251,113,133,0.35)] transition-all hover:bg-rose-400 hover:shadow-[0_0_22px_rgba(251,113,133,0.65)]"
            >
              {editingEntry ? "Save Changes" : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
