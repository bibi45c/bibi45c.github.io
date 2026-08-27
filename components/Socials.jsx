import { Github } from "lucide-react";
import SocialMediaLink from "./SocialMediaLink";
import { site } from "@/lib/site";

function Socials() {
  return (
    <div className="flex gap-6 ">
      <SocialMediaLink link={site.github}>
        <Github />
      </SocialMediaLink>
    </div>
  );
}

export default Socials;
