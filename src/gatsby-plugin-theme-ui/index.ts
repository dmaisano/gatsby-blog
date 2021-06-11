import pluginTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index";
import { merge, Theme } from "theme-ui";

const customTheme: Theme = {
  colors: {
    background: `#FEFEFE`,
    text: `#2E3440`,
    primary: `#3865EF`,
    heading: `#424242`,
    modes: {
      dark: {
        background: `#1A202C`,
        text: pluginTheme.colors.modes.dark.text,
        primary: `#7F9CF5`,
      },
    },
  },
};

const theme = merge(pluginTheme, customTheme);

export default theme;