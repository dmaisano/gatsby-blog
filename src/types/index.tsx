import { Node } from "gatsby";

export type ItemTageType = {
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
  tags?: ItemTageType[];
  fields: {
    tag?: ItemTageType;
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
}
