/** @jsx jsx */
import { Global } from "@emotion/react";
import React from "react";
import { Box, Container, jsx } from "theme-ui";
import { ThemeType } from "../gatsby-plugin-theme-ui";
import { codeStyles } from "../styles";
import Footer from "./footer";
import Header from "./header";
import Seo from "./seo";
import SkipNavLink from "./skip-nav";

type LayoutProps = { className?: string };

const Layout: React.FC<LayoutProps> = ({ children, className = `` }) => (
  <>
    <Global
      // @ts-ignore
      styles={(theme: ThemeType) => {
        return {
          "*": {
            boxSizing: `inherit`,
          },
          html: {
            WebkitTextSizeAdjust: `100%`,
          },
          img: {
            borderStyle: `none`,
          },
          pre: {
            fontFamily: `monospace`,
            fontSize: `1em`,
          },
          "[hidden]": {
            display: `none`,
          },
          "::selection": {
            backgroundColor: theme.colors?.text,
            color: theme.colors?.background,
          },
        };
      }}
    />
    <Seo />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" sx={{ ...codeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </>
);

export default Layout;
