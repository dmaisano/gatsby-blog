import loadable from "@loadable/component";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React from "react";
import { prismTheme } from "../../styles";
import { LiveProviderProps } from "../../types";
import Copy from "./copy-code";

type CodeProps = {
  codeString: string;
  language?: Language;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  metastring?: string;
  [key: string]: any;
};

/** Helper function to extract the code language and parameters passed in the MDX code block */
function getParams(className = ``): {
  language: Language;
  title?: string;
  [key: string]: any;
} {
  if (!className) {
    return {
      language: `markdown`,
    };
  }

  let [lang = ``, params = ``] = className.split(`:`);
  const extraParams = [];

  params.split(`&`).map((param) => {
    const [key, value] = param.split(`=`);
    extraParams[key] = value;
  });

  return {
    language: lang.split(`language-`).pop()?.split(`{}`).shift() as Language,
    ...extraParams,
  };
}

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false;
  }

  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );
    return inRange;
  };
};

const LazyLiveProvider = loadable<
  LiveProviderProps & {
    showCopyButton?: boolean;
    content?: string;
  }
>(async () => {
  const { LiveProvider, LiveEditor, LiveError, LivePreview } = await import(
    `react-live`
  );
  return (props) => (
    <LiveProvider {...props}>
      {props.showCopyButton && <Copy content={props.code || ""} />}
      <LiveEditor data-name="live-editor" />
      <LiveError />
      <LivePreview data-name="live-preview" />
    </LiveProvider>
  );
});

const Code: React.FC<CodeProps> = ({
  codeString,
  showLineNumbers = true,
  showCopyButton = true,
  className: blockClassName,
  metastring = ``,
  ...props
}) => {
  const { language, title } = getParams(blockClassName);
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  if (props["react-live"]) {
    return (
      <div className="react-live-wrapper">
        <LazyLiveProvider code={codeString} />
      </div>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={prismTheme.base}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && (
            <div className="code-title">
              <div>{title}</div>
            </div>
          )}
          <div className="gatsby-highlight" data-language={language}>
            <pre
              className={className}
              style={style}
              data-linenumber={showLineNumbers}
            >
              {showCopyButton && <Copy content={codeString} fileName={title} />}
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                  }

                  return (
                    <div {...lineProps}>
                      {showLineNumbers && (
                        <span className="line-number-style">{i + 1}</span>
                      )}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  );
};

export default Code;
