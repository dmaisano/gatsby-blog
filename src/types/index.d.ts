import { Node } from "gatsby";
import { Language, PrismTheme } from "prism-react-renderer";
import { ComponentType } from "react";

declare module "*.mdx" {
  const MDXComponent: ComponentType;
  export default MDXComponent;
}

type LiveProviderProps = {
  scope?: { [key: string]: any };
  code?: string;
  noInline?: boolean;
  transformCode?: (code: string) => string;
  language?: Language;
  disabled?: boolean;
  theme?: PrismTheme;
};

export type ItemTagType = {
  name: `React`;
  slug: string;
};

export interface MdxPostType extends Node {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead?: number;
  tags?: ItemTagType[];
  fields: {
    tag?: ItemTagType;
    [key: string]: unknown;
  };
}

export interface MdxPageType extends Node {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
}

export interface ProjectType {
  title: string;
  description: string;
  href?: string;
  repo?: string;
  priority?: number;
}
