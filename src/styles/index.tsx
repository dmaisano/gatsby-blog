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
  ":hover": {
    background: lighten(`primary`, 0.33),
  },
  ":not(:last-child)": {
    borderBottom: `1px dotted`,
    borderColor: `border`,
  },
};
