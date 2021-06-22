import { ThemeUICSSObject } from "theme-ui";
import { lighten } from "@theme-ui/color";

export const ListStyles: ThemeUICSSObject = {
  ":hover": {
    background: lighten(`primary`, 0.33),
  },
  ":not(:last-child)": {
    borderBottom: `1px dotted`,
    borderColor: `border`,
  },
};
