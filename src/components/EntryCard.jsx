function EntryCard({ title, date, imageUrl, content, createdAt, onClick }) {
  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <article
      onClick={onClick}
      className="
    group cursor-pointer overflow-hidden rounded-2xl
    border border-rose-300/70
    bg-black/70
    shadow-[0_0_12px_rgba(251,113,133,0.35)]
    backdrop-blur-md
    transition-all duration-300
    hover:-translate-y-1
    hover:border-rose-300
    hover:shadow-[0_0_25px_rgba(251,113,133,0.65)]
  "
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      )}

      <div className="p-5">
        <p className="text-sm text-orange-200/70">
          {date}
          {formattedTime && ` · ${formattedTime} Uhr`}
        </p>

        <h3 className="mt-1 text-2xl font-semibold text-white">{title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-white/60">{content}</p>
      </div>
    </article>
  );
}

export default EntryCard;
