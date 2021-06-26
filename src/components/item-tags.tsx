/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { replaceSlashes, useSiteMetadata } from "../utils";
import { GatsbyLink } from "./links";

type TagsProps = {
  tags: {
    name: string;
    slug: string;
  }[];
};

const ItemTags = ({ tags }: TagsProps) => {
  const { basePath, tagsPath } = useSiteMetadata();

  return (
    <>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `, `}
          <GatsbyLink
            to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
          >
            {tag.name}
          </GatsbyLink>
        </React.Fragment>
      ))}
    </>
  );
};

export default ItemTags;
