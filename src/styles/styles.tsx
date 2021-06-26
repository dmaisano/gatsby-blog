import { lighten } from "@theme-ui/color";
import { ThemeUIStyleObject } from "theme-ui";

export const visuallyHidden: ThemeUIStyleObject = {
  // include `px` so we can use it with `sx`
  border: 0,
  clip: `rect(0, 0, 0, 0)`,
  height: `1px`,
  margin: `-1px`,
  overflow: `hidden`,
  padding: 0,
  position: `absolute`,
  whiteSpace: `nowrap`,
  width: `1px`,
};

export const listItemStyles: ThemeUIStyleObject = {
  py: `1.25rem`,
  px: `0.75rem`,
  ":hover": {
    background: lighten(`primary`, 0.33),
  },
  ":not(:last-child)": {
    borderBottom: `1px dotted`,
    borderColor: `border`,
  },
};

export const typographyStyles: {
  [key: string]: ThemeUIStyleObject;
} = {
  h1: {
    variant: `text.heading`,
    fontSize: [4, 5, 6, 6],
  },
  h2: {
    variant: `text.heading`,
    fontSize: [4, 5, 5, 6],
  },
  h3: {
    variant: `text.heading`,
    fontSize: [3, 4, 4, 5],
  },
  h4: {
    variant: `text.heading`,
    fontSize: [2, 3, 3, 4],
  },
  h5: {
    variant: `text.heading`,
    fontSize: [1, 2, 2, 3],
  },
  h6: {
    variant: `text.heading`,
    fontSize: 1,
  },
  time: {
    color: `heading`,
    fontSize: [`1.125rem`, `1.125rem`, 2],
    fontFamily: `'Inconsolata', monospace`,
  },
};
