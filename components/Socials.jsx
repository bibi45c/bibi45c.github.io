import { Github } from "lucide-react";
import SocialMediaLink from "./SocialMediaLink";
import { site } from "@/lib/site";

function Socials({ className = "" }) {
  return (
    <div className={`-ml-2.5 flex ${className}`}>
      <SocialMediaLink link={site.github} label="GitHub">
        <Github size={20} aria-hidden="true" />
      </SocialMediaLink>
    </div>
  );
}

export default Socials;
