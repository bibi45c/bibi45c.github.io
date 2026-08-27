export default function BasisInfo() {
  return (
    <div className="w-full rounded-lg shadow-[0_0px_1.2px_rgb(140,140,140)] py-6 px-4">
      <h2 className="mb-6 ml-2 text-lg text-green-200 opacity-60">
        💡 About Me
      </h2>
      <ul className="flex flex-col gap-5 pl-6 text-sm list-disc">
        <li>
          👋 I&apos;m <span className="font-bold">Jiayu Jiang</span>. This is a
          long-term home for technical writing and project case studies.
        </li>

        <li>
          🧭 Current focus: data engineering, applied AI, DevSecOps, and
          software systems.
        </li>
        <li>
          ✍️ Writing principle: keep useful notes public, version-controlled,
          and easy to revisit.
        </li>
      </ul>
    </div>
  );
}
