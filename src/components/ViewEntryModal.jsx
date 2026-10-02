import { useState } from "react";

function ViewEntryModal({
  entry,
  onClose,
  onEdit,
  onDelete,
  onAddUpdate,
  onDeleteUpdate,
  onEditUpdate,
}) {
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [editingUpdateText, setEditingUpdateText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-rose-300/50 bg-slate-950/95 shadow-[0_0_30px_rgba(251,113,133,0.35)]">
        {entry.imageUrl && (
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="h-72 w-full object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-orange-200/70">{entry.date}</p>

              <h2 className="mt-1 text-3xl font-semibold text-white">
                {entry.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-white/60 transition hover:text-rose-300"
            >
              ✕
            </button>
          </div>

          <p className="mt-6 whitespace-pre-wrap leading-relaxed text-white/80">
            {entry.content}
          </p>

          {entry.updates && entry.updates.length > 0 && (
            <div className="mt-8 space-y-5">
              {entry.updates.map((update) => (
                <div
                  key={update.id}
                  className="rounded-xl border border-orange-300/30 bg-black/30 p-5"
                >
                  <p className="mb-2 text-sm font-semibold text-orange-200">
                    Update ·{" "}
                    {new Date(update.createdAt).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {editingUpdateId === update.id ? (
                    <textarea
                      value={editingUpdateText}
                      onChange={(event) =>
                        setEditingUpdateText(event.target.value)
                      }
                      rows="4"
                      className="w-full rounded-xl border border-orange-300/40 bg-black/40 p-4 text-white outline-none focus:border-orange-300"
                    />
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed text-white/80">
                      {update.content}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end gap-3">
                    {editingUpdateId === update.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUpdateId(null);
                            setEditingUpdateText("");
                          }}
                          className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!editingUpdateText.trim()) return;

                            onEditUpdate(update.id, editingUpdateText);

                            setEditingUpdateId(null);
                            setEditingUpdateText("");
                          }}
                          className="rounded-lg border border-orange-300/50 bg-orange-500/20 px-3 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/30"
                        >
                          💾 Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUpdateId(update.id);
                            setEditingUpdateText(update.content);
                          }}
                          className="rounded-lg border border-orange-300/40 px-3 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
                        >
                          ✏️ Edit Update
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Delete this update? This cannot be undone.",
                            );

                            if (!confirmed) return;

                            onDeleteUpdate(update.id);
                          }}
                          className="rounded-lg border border-red-400/40 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                        >
                          🗑️ Delete Update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAddingUpdate && (
            <div className="mt-6">
              <label className="mb-2 block font-semibold text-orange-200">
                Add an Update
              </label>

              <textarea
                value={updateText}
                onChange={(event) => setUpdateText(event.target.value)}
                placeholder="What happened next?"
                rows="5"
                className="w-full rounded-xl border border-orange-300/40 bg-black/40 p-4 text-white outline-none placeholder:text-white/40 focus:border-orange-300"
              />

              <div className="mt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingUpdate(false);
                    setUpdateText("");
                  }}
                  className="rounded-lg border border-white/20 px-4 py-2 text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!updateText.trim()) return;

                    onAddUpdate(updateText);

                    setUpdateText("");
                    setIsAddingUpdate(false);
                  }}
                  className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-400"
                >
                  Save Update
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddingUpdate(true)}
              className="rounded-lg border border-orange-300/60 bg-orange-500/20 px-5 py-3 font-semibold text-orange-200 transition hover:bg-orange-500/30"
            >
              ➕ Add Update
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg border border-red-400/60 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
            >
              🗑️ Delete Entry
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="
                rounded-lg
                border border-rose-300/60
                bg-rose-500
                px-5 py-3
                font-semibold text-white
                shadow-[0_0_12px_rgba(251,113,133,0.35)]
                transition-all duration-300
                hover:bg-rose-400
                hover:shadow-[0_0_22px_rgba(251,113,133,0.65)]
                "
            >
              ✏️ Edit Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEntryModal;
