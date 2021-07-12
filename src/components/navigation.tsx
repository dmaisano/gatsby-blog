/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { GatsbyLink } from "./links";

type NavigationProps = {
  nav: {
    title: string;
    slug: string;
  }[];
};

const Navigation: React.FC<NavigationProps> = ({ nav }: NavigationProps) => {
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
            <GatsbyLink key={item.slug} to={`/${item.slug}`}>
              {item.title}
            </GatsbyLink>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
