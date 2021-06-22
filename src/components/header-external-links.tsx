/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { useSiteMetadata } from "../utils";
import { ThemeLink } from "./links";

type HeaderExternalLinksProps = {
  externalLinks: ReturnType<typeof useSiteMetadata>["externalLinks"];
};

const HeaderExternalLinks: React.FC<HeaderExternalLinksProps> = ({
  externalLinks,
}) => {
  return (
    <>
      {externalLinks && externalLinks.length > 0 && (
        <div sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [1, `18px`] }}>
          {externalLinks.map((link) => (
            <ThemeLink key={link.url} href={link.url}>
              {link.name}
            </ThemeLink>
          ))}
        </div>
      )}
    </>
  );
};

export default HeaderExternalLinks;
