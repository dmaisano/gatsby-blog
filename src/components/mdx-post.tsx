/** @jsx jsx */
import { lighten } from "@theme-ui/color";
import { Flex, Heading, jsx, ThemeUIStyleObject } from "theme-ui";
import { listItemStyles, typographyStyles } from "../styles";
import { ItemTageType, MdxPostType } from "../types";
import { useSiteMetadata } from "../utils";
import ItemTag, { ItemTagProps } from "./item-tag";
import { GatsbyLink } from "./links";

export const itemTagStyles: {
  [key: string]: ThemeUIStyleObject;
} = {
  react: {
    backgroundColor: `#282C34`,
    color: `#61dafb`,
    ":hover": {
      backgroundColor: lighten(`#282C34`, 0.15),
      color: lighten(`#61dafb`, 0.15),
    },
  },
};

type MdxPostProps = {
  post: MdxPostType;
  showTag?: boolean;
  _sx?: ThemeUIStyleObject;
};

const MdxPost: React.FC<MdxPostProps> = ({ post, showTag = true, _sx }) => {
  const { basePath, tagsPath } = useSiteMetadata();

  const hasTag = showTag && post.tags && post.tags.length > 0;

  let itemTagProps: ItemTagProps = {} as any;
  if (hasTag) {
    const tag: ItemTageType = (post as any).tags[0];
    const _sx = itemTagStyles[tag.slug];
    (_sx as any)[":hover"].textDecoration = `none`;

    itemTagProps = {
      basePath,
      tagsPath,
      tag,
      _sx,
    } as ItemTagProps;
  }

  return (
    <Flex
      sx={{
        display: [`block`, `block`, `block`, `flex`],
        flexDirection: [`row`, `row`],
        justifyContent: [`space-between`],
        ":hover a:first-of-type": {
          textDecorationColor: lighten(`heading`, 0.1),
        },
        ":hover a h3": {
          color: lighten(`heading`, 0.1),
        },
        ":hover time": {
          color: `#666`,
        },
        ...listItemStyles,
        ..._sx,
      }}
    >
      <GatsbyLink to={post.slug} sx={{ ...typographyStyles.h3 }}>
        <Heading as="h3" sx={{ pb: [`0.75rem`] }}>
          {post.title}
        </Heading>
      </GatsbyLink>
      <Flex
        sx={{
          flexDirection: [`row`, `row`, `row`, `column-reverse`],
          alignItems: [`center`, `center`, `center`, `flex-end`],
        }}
      >
        {hasTag ? <ItemTag {...itemTagProps} /> : <div />}
        <time
          sx={{ ...typographyStyles.time, pl: [2, 2, 2, 0], pb: [0, 0, 0, 2] }}
        >
          {post.date}
        </time>
      </Flex>
    </Flex>
  );
};

export default MdxPost;
