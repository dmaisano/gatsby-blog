/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { useSiteMetadata } from "../utils";
import HeaderExternalLinks from "./header-external-links";
import { GatsbyLink } from "./links";
import Navigation from "./navigation";

const HeaderTitle: React.FC<{ siteTitle: string }> = ({ siteTitle }) => (
  <GatsbyLink
    to="/"
    aria-label={`${siteTitle} - Back to home`}
    sx={{ color: `heading`, textDecoration: `none` }}
  >
    <div sx={{ my: 0, fontWeight: `medium`, fontSize: [3, 4] }}>
      {siteTitle}
    </div>
  </GatsbyLink>
);

const Header: React.FC = () => {
  const {
    basePath,
    siteTitle,
    navigation: nav,
    externalLinks,
  } = useSiteMetadata();

  return (
    <header sx={{ mb: [5, 6] }}>
      <HeaderTitle siteTitle={siteTitle} />
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />
        <HeaderExternalLinks externalLinks={externalLinks} />
      </div>
    </header>
  );
};

export default Header;
