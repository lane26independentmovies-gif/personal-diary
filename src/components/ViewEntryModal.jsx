function ViewEntryModal({ entry, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-rose-300/50 bg-slate-950/95 shadow-[0_0_30px_rgba(251,113,133,0.35)]">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="h-72 w-full object-cover"
        />

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

          <div className="mt-8 flex flex-wrap justify-end gap-3">
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
