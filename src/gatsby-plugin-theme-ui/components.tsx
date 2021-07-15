/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import Code from "../components/code";
import Title from "../components/title";
import { preToCodeBlock } from "../utils";

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
  ImgComment: ({ children, ...props }) => {
    if (!children) {
      return null;
    }

    return (
      <div sx={{ width: `100%`, display: `flex`, justifyContent: `center` }}>
        <blockquote
          sx={{
            variant: `styles.blockquote`,
            mt: [`-0.5rem`, `-0.5rem`, `-2rem`],
            mb: `2rem`,
            fontStyle: `oblique`,
          }}
        >
          {children}
        </blockquote>
      </div>
    );
  },
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  wrapper: ({ children }) => <React.Fragment>{children}</React.Fragment>,
};

export default components;
