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
        fontSize: [1, 1, `1.125rem`],
        fontWeight: `medium`,
        padding: [`0.625rem`, `0.625rem`, `0.75rem`],
        borderRadius: `3px`,
        ..._sx,
      }}
    >
      {tag.name}
    </GatsbyLink>
  );
};

export default ItemTag;
