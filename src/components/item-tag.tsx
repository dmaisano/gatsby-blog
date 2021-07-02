/** @jsx jsx */
import React from "react";
import { jsx, ThemeUIStyleObject } from "theme-ui";
import { ItemTageType } from "../types";
import { replaceSlashes } from "../utils";
import { GatsbyLink } from "./links";

export interface ItemTagProps {
  tag: ItemTageType;
  basePath: string;
  tagsPath: string;
  _sx: ThemeUIStyleObject;
}

const ItemTag: React.FC<ItemTagProps> = ({ tag, basePath, tagsPath, _sx }) => {
  return (
    <GatsbyLink
      to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
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
