export { copyToClipboard } from "./copy-to-clipboard";
export { useSiteMetadata } from "./use-site-metadata";

export const dateFormatString = `MMM D, YYYY`;

/**
 * Replace double slashes // with one slash /
 * @description This prevents double slashes as users might add e.g. the basePath as "/blog" or "blog"
 * @param input
 * @return {string} - Sanitized string
 */
export const replaceSlashes = (input: string): string => {
  return input.replace(/\/\/+/g, `/`);
};

export const preToCodeBlock = (preProps) => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === "code"
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: match != null ? match[1] : "",
      ...props,
    };
  }
  return undefined;
};
