/** @jsx jsx */
import React from "react";
import { jsx, ThemeUIStyleObject } from "theme-ui";

type ListProps = {
  children: React.ReactNode;
  sx?: ThemeUIStyleObject;
};

const List = (props: ListProps) => {
  let sx = {
    mb: [5, 5, 6],
    ul: { margin: 0, padding: 0 },
    li: { listStyle: `none`, mb: 3 },
    a: { variant: `links.listItem` },
  };

  if (props.sx) {
    for (const [key, value] of Object.entries(sx)) {
      sx[key] = value;
    }
  }

  return <section sx={sx}>{props.children}</section>;
};

export default List;
