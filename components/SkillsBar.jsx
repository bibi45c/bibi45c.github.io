export default function SkillsBar() {
  const topics = [
    "Data Engineering",
    "AI Systems",
    "DevSecOps",
    "Python",
    "SQL",
    "Spark",
    "Unity",
    "GitHub Actions",
  ];

  return (
    <div className="flex flex-col w-full gap-6 px-6 py-4 shadow-[0_0px_1.2px_rgb(140,140,140)] rounded-lg ">
      <h2 className="text-lg">
        ⚙️ <span className="text-green-200 opacity-60">Tech Stack</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs text-foreground/80"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
