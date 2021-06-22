import { Node } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

type ProjectQueryResult = {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    banner: IGatsbyImageData;
    href: string;
    repo?: string;
  };
};

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
