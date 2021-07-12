/** @jsx jsx */
import React from "react";
import { jsx, ThemeUIStyleObject } from "theme-ui";
import { ItemTageType } from "../types";
import { GatsbyLink } from "./links";

export interface ItemTagProps {
  tag: ItemTageType;
  tagsPath: string;
  _sx: ThemeUIStyleObject;
}

const ItemTag: React.FC<ItemTagProps> = ({ tag, tagsPath, _sx }) => {
  return (
    <GatsbyLink
      to={`/${tagsPath}/${tag.slug}`}
      sx={{
        variant: `links.tag`,
        ..._sx,
      }}
    >
      {tag.name}
    </GatsbyLink>
  );
};

export default ItemTag;
