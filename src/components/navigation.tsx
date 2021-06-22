/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { replaceSlashes } from "../utils";
import { GatsbyLink } from "./links";

type NavigationProps = {
  basePath: string;
  nav: {
    title: string;
    slug: string;
  }[];
};

const Navigation: React.FC<NavigationProps> = ({
  basePath,
  nav,
}: NavigationProps) => {
  return (
    <>
      {nav && nav.length > 0 && (
        <nav
          sx={{
            "a:not(:last-of-type)": { mr: 3 },
            fontSize: [1, `18px`],
            ".active": { color: `heading` },
          }}
        >
          {nav.map((item) => (
            <GatsbyLink
              key={item.slug}
              to={replaceSlashes(`/${basePath}/${item.slug}`)}
            >
              {item.title}
            </GatsbyLink>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
function useMinimalBlogConfig(): { basePath: any } {
  throw new Error("Function not implemented.");
}
