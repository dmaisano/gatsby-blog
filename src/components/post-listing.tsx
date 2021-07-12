/** @jsx jsx */
import { lighten } from "@theme-ui/color";
import { Box, Flex, Heading, jsx, ThemeUIStyleObject } from "theme-ui";
import { ItemTageType, MdxPostType } from "../types";
import { useSiteMetadata } from "../utils";
import ItemTag, { ItemTagProps } from "./item-tag";
import { GatsbyLink } from "./links";

export const itemTagStyles: {
  [key: string]: ThemeUIStyleObject;
} = {
  react: {
    backgroundColor: `secondary`,
    color: `primary`,
    ":hover": {
      backgroundColor: lighten(`secondary`, 0.15),
      color: lighten(`primary`, 0.15),
    },
  },
};

type PostListingProps = {
  post: MdxPostType;
  showTag?: boolean;
  _sx?: ThemeUIStyleObject;
};

const PostListing: React.FC<PostListingProps> = ({
  post,
  showTag = true,
  _sx,
}) => {
  const { tagsPath } = useSiteMetadata();

  const hasTag = showTag && post.tags && post.tags.length > 0;

  let itemTagProps = {} as ItemTagProps;
  if (hasTag) {
    const tag: ItemTageType = (post as any).tags[0];
    const _sx = itemTagStyles[tag.slug];
    (_sx as any)[":hover"].textDecoration = `none`;

    itemTagProps = {
      tagsPath,
      tag,
      _sx,
    };
  }

  return (
    <Box
      as="li"
      sx={{
        display: [`block`, `block`, `block`, `flex`],
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-between`,
        ":hover a:first-of-type": {
          textDecorationColor: lighten(`heading`, 0.1),
        },
        ":hover a h3": {
          color: lighten(`heading`, 0.1),
        },
        ":hover time": {
          color: `#666`,
        },

        ..._sx,
      }}
      variant="list_item"
    >
      <GatsbyLink to={post.slug}>
        <Heading
          as="h3"
          sx={{
            fontWeight: `medium`,
            pb: [`0.75rem`, `0.75rem`, `0.75rem`, 0],
            pr: [0, 0, 0, `0.75rem`],
            m: 0,
          }}
          variant="styles.h3"
        >
          {post.title}
        </Heading>
      </GatsbyLink>
      <Flex
        sx={{
          minWidth: `fit-content`,
          flexDirection: [`row`, `row`, `row`, `column-reverse`],
          alignItems: [`center`, `center`, `center`, `flex-end`],
        }}
      >
        {hasTag ? <ItemTag {...itemTagProps} /> : <div />}
        <time
          sx={{ variant: `styles.time`, pl: [2, 2, 2, 0], pb: [0, 0, 0, 2] }}
        >
          {post.date}
        </time>
      </Flex>
    </Box>
  );
};

export default PostListing;
