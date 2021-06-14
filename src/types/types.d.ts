import { Node } from "gatsby";

interface MdxPost extends Node {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead?: number;
  fields: {
    tag: {
      name: string;
      value: string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}
