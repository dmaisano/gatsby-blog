/** @jsx jsx */
import Prism from "@theme-ui/prism";
import React from "react";
import { jsx, Text } from "theme-ui";
import Title from "../components/title";

const components = {
  Text: ({ children, ...props }) => <Text {...props}>{children}</Text>,
  Title: ({ children, text, ...props }) => (
    <Title text={text} {...props}>
      {children}
    </Title>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      sx={{
        borderBottom: `1px dotted`,
        borderColor: `border`,
        ":hover": {
          textDecoration: `none !important`,
        },
      }}
    >
      {children}
    </a>
  ),
  pre: (props) => props.children,
  code: Prism,
  wrapper: ({ children }) => <React.Fragment>{children}</React.Fragment>,
};

export default components;
