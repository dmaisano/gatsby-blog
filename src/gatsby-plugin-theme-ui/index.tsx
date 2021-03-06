import { darken, lighten, transparentize } from "@theme-ui/color";
import { tailwind } from "@theme-ui/presets";
import { merge, Theme, ThemeUIStyleObject } from "theme-ui";
import { prismTheme } from "../styles";

const copyButtonBG =
  prismTheme.themeUI[
    ".property,.number,.function-name,.constant,.symbol,.deleted"
  ].color;

/**
 * breakpoints = [`640px`, `768px`, `1024px`, `1280px`];
 */
const theme = merge(tailwind as Theme, {
  initialColorModeName: `light`,
  config: {
    useCustomProperties: true,
  },
  colors: {
    react: `#61dafb`,
    background: `#FEFEFE`,
    primary: `#3865EF`,
    secondary: `#282C34`,
    heading: `#424242`,
    text: `#2E3440`,
    border: `#2C2B2B`,
    // @ts-ignore
    divide: tailwind.colors.gray[4],
    modes: {},
  },
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    pre: {},
    code: {},
    a: {
      transition: `all 0.3s ease-in-out`,
      color: `text`,
    },
    p: {
      fontSize: [1, 1, 2],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
      wordBreak: `break-word`,
    },
    ul: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
      },
    },
    ol: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
      },
    },
    h1: {
      variant: `text.heading`,
      fontSize: [5, 6, 6, 7],
      mt: 4,
    },
    h2: {
      variant: `text.heading`,
      fontSize: [4, 5, 5, 6],
      mt: 4,
    },
    h3: {
      variant: `text.heading`,
      fontSize: [3, 4, 4, 5],
      mt: 4,
    },
    h4: {
      variant: `text.heading`,
      fontSize: [2, 3, 3, 4],
      mt: 3,
    },
    h5: {
      variant: `text.heading`,
      fontSize: [1, 2, 2, 3],
      mt: 3,
    },
    h6: {
      variant: `text.heading`,
      fontSize: 1,
      mb: 2,
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `6px`,
      mx: 0,
      pl: 4,
      p: {
        fontStyle: `italic`,
      },
    },
    time: {
      color: `heading`,
      fontSize: [`1.125rem`, `1.125rem`, 2],
      fontFamily: `'Inconsolata', monospace`,
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      // @ts-ignore
      th: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
      td: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
    hr: {
      mx: 0,
    },
  },
  copyButton: {
    backgroundColor: copyButtonBG,
    border: `none`,
    color: prismTheme.themeUI.color,
    cursor: `pointer`,
    fontSize: [1, 1, 2],
    fontFamily: `body`,
    fontWeight: `medium`,
    letterSpacing: `0.025rem`,
    transition: `default`,
    "&[disabled]": {
      cursor: `not-allowed`,
    },
    ":not([disabled]):hover": {
      backgroundColor: darken(copyButtonBG, 0.3),
    },
    position: `absolute`,
    top: 0,
    right: 0,
    zIndex: 1,
    borderRadius: `0 0 0 0.25rem`,
    // padding: `0.25rem 0.6rem`,
    padding: `0.33rem 0.75rem`,
  } as ThemeUIStyleObject,
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: [`1024px`, `1024px`, `1024px`, `1024px`],
      // maxWidth: [`1024px`, `1024px`, `1024px`, `1024px`, `1280px`],
    },
  },
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  // @ts-ignore
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    item_tag: {
      backgroundColor: `secondary`,
      color: `react`,
      fontSize: [1, 1, `1.125rem`],
      fontWeight: `medium`,
      padding: [`0.625rem`, `0.625rem`, `0.75rem`],
      borderRadius: `3px`,
      ":hover": {
        backgroundColor: lighten(`secondary`, 0.15),
        color: lighten(`react`, 0.15),
      },
      source_code: {
        backgroundColor: `secondary`,
        color: `background`,
        fontSize: [1, 1, `1.125rem`],
        fontWeight: `medium`,
        padding: [`0.625rem`, `0.625rem`, `0.75rem`],
        borderRadius: `3px`,
        ":hover": {
          backgroundColor: lighten(`secondary`, 0.15),
        },
      },
    },
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    tag: {
      fontSize: [1, 1, `1.125rem`],
      fontWeight: `medium`,
      padding: [`0.625rem`, `0.625rem`, `0.75rem`],
      borderRadius: `3px`,
    },
    list_item: {
      fontSize: [1, 2, 3],
      color: `blue`,
    },
  },
  list_item: {
    py: `1.25rem`,
    px: `0.75rem`,
    ":hover": {
      background: `#D4DEFC`,
    },
    ":not(:last-child)": {
      borderBottom: `1px dotted`,
      borderColor: `secondary`,
    },
  },
});

export default theme;

export type ThemeType = typeof theme;
