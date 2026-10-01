import { useState } from "react";
import Header from "./components/Header";
import EntryCard from "./components/EntryCard";


function App() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Movie Night",
      date: "2026-09-28",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
      content: "A quiet evening, an old movie and way too much popcorn...",
    },
    {
      id: 2,
      title: "Coding Session",
      date: "2026-09-27",
      imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      content:
        "Worked on my React project and learned more about components and props.",
    },
    {
      id: 3,
      title: "80's Inspiration",
      date: "2026-09-26",
      imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
      content: "Music, movies and a little bit of retro inspiration.",
    },
  ]);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/diary-background.png')",
      }}
    >
      <div className="min-h-screen bg-black/20">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <h2 className="mb-6 text-3xl font-semibold text-white">My Entries</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                title={entry.title}
                date={entry.date}
                imageUrl={entry.imageUrl}
                content={entry.content}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
