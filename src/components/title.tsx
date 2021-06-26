/** @jsx jsx */
import React, { ElementType } from "react";
import { Box, Heading, jsx } from "theme-ui";
import { typographyStyles } from "../styles";

type TitleProps = {
  as?: ElementType<any>;
  className?: string;
  text: string;
};

const Title: React.FC<TitleProps> = ({
  text,
  children,
  as = `h2`,
  className = ``,
}) => (
  <Box
    sx={{
      justifyContent: `space-between`,
      alignItems: `center`,
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
      mb: 4,
      flexFlow: `wrap`,
      boxSizing: `border-box`,
      display: `flex`,
    }}
  >
    <Heading
      as={as}
      sx={{
        fontWeight: `medium`,
        fontSize: [3, 4],
        fontFamily: `heading`,
        lineHeight: `heading`,
        color: `heading`,
        ...typographyStyles.h3,
      }}
      className={className}
    >
      {text}
    </Heading>
    <div
      sx={{
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
      }}
    >
      {children}
    </div>
  </Box>
);

export default Title;
