import { getMessages } from "@/lib/i18n";
import styles from "./ProfileNote.module.css";

export default function SkillsBar({ locale = "en" }) {
  const t = getMessages(locale);
  const groups = [
    { title: t.dataTools, tools: ["Python", "SQL", "Spark"] },
    { title: t.buildTools, tools: ["Unity", "GitHub Actions"] },
  ];

  return (
    <div className={styles.toolColumns}>
      {groups.map(({ title, tools }) => (
        <div key={title}>
          <h3 className={styles.toolHeading}>{title}</h3>
          <ul className={styles.toolList}>
            {tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
