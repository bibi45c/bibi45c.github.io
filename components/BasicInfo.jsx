import { getMessages } from "@/lib/i18n";
import styles from "./ProfileNote.module.css";

export default function BasisInfo({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div>
      <p className={styles.wordmark}>{t.profileNote}</p>
      <div className={styles.intro}>
        <div className={styles.monogram} aria-hidden="true">b.</div>
        <div>
          <h2 className={styles.greeting}>{t.profileGreeting}</h2>
          <p className={styles.description}>{t.profileIntroduction}</p>
          <p className={styles.asideNote}>{t.profileAside}</p>
        </div>
      </div>
    </div>
  );
}
