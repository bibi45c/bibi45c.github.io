export default function SocialMediaLink({ children, link, label }) {
  return (
    <a
      className="inline-flex size-10 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:text-strong"
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}
