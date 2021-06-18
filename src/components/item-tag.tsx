import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import React from "react";
import { TagType } from "../types/types";
import Link from "./link";

export const TagColors: {
  [key: string]: {
    bg: string;
    text: string;
  };
} = {
  react: {
    bg: `#282C34`,
    text: `#61dafb`,
  },
};

interface ItemTagProps {
  tag: TagType;
}

const ItemTag: React.FC<ItemTagProps> = ({ tag }) => {
  const { basePath, tagsPath } = useMinimalBlogConfig();

  return (
    <Link
      id="item-tag"
      sx={{
        backgroundColor: [TagColors[tag.slug].bg],
        color: [TagColors[tag.slug].text],
        padding: [`0.75rem 0.5rem`],
        marginTop: [0, 0, `0.25rem`],
        float: [`left`],
        borderRadius: `3px`,
      }}
      to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
    >
      {tag.name}
    </Link>
  );
};

export default ItemTag;
