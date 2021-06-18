/** @jsx jsx */
import React from "react";
import { Box, Heading, jsx, ThemeUIStyleObject } from "theme-ui";
import { objectMapper } from "../../../utils/object-mapper";

type TitleProps = {
  children: React.ReactNode;
  as?: React.ElementType<any>;
  className?: string;
  text: string;
  boxStyles?: ThemeUIStyleObject;
  headingStyles?: ThemeUIStyleObject;
};

const Title: React.FC<TitleProps> = ({
  text,
  children,
  as = `h2`,
  className = ``,
  boxStyles,
  headingStyles,
}) => {
  const boxStylesMerged: ThemeUIStyleObject = {
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
  };

  const headingStylesMerged = {
    fontWeight: `medium`,
    fontSize: [3, 4],
    fontFamily: `heading`,
    lineHeight: `heading`,
    color: `heading`,
  };

  objectMapper(boxStylesMerged, boxStyles);
  objectMapper(headingStylesMerged, headingStyles);

  return (
    <Box sx={boxStylesMerged}>
      <Heading as={as} sx={headingStylesMerged} className={className}>
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
};

export default Title;
