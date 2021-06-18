import { Node } from "gatsby";

type TagType = {
  name: `React`;
  slug: string;
};

interface MdxPost extends Node {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead?: number;
  tags?: TagType[];
  fields: {
    tag?: TagType;
    [key: string]: any;
  };
  [key: string]: any;
}
