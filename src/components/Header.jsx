function Header({ onAddEntry }) {
  return (
    <div className="px-6 pt-6 md:px-10 md:pt-8">
      <header
        className="
        mx-auto flex max-w-7xl items-center justify-between
        rounded-2xl
        border border-rose-300/50
        bg-black/60
        px-8 py-5
        shadow-[0_0_15px_rgba(251,113,133,0.25)]
        backdrop-blur-md
        "
      >
        <div>
          <h1
            className="text-5xl font-bold text-orange-100 md:text-6xl"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            My Personal Diary
          </h1>

          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70">
            Thoughts • Memories • Ideas • Inspiration
          </p>
        </div>

        <button
          type="button"
          onClick={onAddEntry}
          className="
            rounded-lg
            border border-rose-300/60
            bg-rose-500
            px-6 py-3
            font-semibold text-white
            shadow-[0_0_12px_rgba(251,113,133,0.35)]
            transition-all duration-300
            hover:bg-rose-400
            hover:shadow-[0_0_22px_rgba(251,113,133,0.65)]
        "
        >
          + Add Entry
        </button>
      </header>
    </div>
  );
}

export default Header;
