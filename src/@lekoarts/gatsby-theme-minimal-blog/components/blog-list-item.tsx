/** @jsx jsx */
import { Box, Heading, jsx } from "theme-ui";
import { MdxPost } from "../../../types/types";
import { lighten } from "@theme-ui/color";
import Link from "../../../components/link";
import ItemTag from "../../../components/item-tag";

type BlogListItemProps = {
  post: MdxPost;
  showTags?: boolean;
};

const BlogListItem: React.FC<BlogListItemProps> = ({
  post,
  showTags = false,
}) => {
  return (
    <Box
      id="blog-list-item"
      sx={{
        width: `100%`,
        position: `relative`,
        display: [`block`, `flex`],
        flexDirection: `row`,
        justifyContent: `space-between`,
        paddingTop: [2, 3],
        paddingBottom: [2, 3],
        ":hover": {
          background: lighten(`primary`, 0.33),
        },
        ":not(:last-child)": {
          borderBottom: `1px dotted`,
          borderColor: `border`,
        },
      }}
    >
      <Link
        sx={{
          width: `100%`,
        }}
        to={post.slug}
      >
        <Heading
          as="h3"
          sx={{
            color: `heading`,
            fontSize: [3, 4],
            fontWeight: `900`,
            paddingTop: `0.75rem`,
            paddingBottom: `0.75rem`,
            lineHeight: `1.2`,
          }}
        >
          {post.title}
        </Heading>
      </Link>
      <Box
        sx={{
          width: [`auto`, `200px`],
          display: `flex`,
          flexDirection: [`row`, `column-reverse`],
          alignItems: [`center`, `inherit`],
          paddingRight: [0, `0.75rem`],
          paddingBottom: [`1.25rem`],
          marginLeft: `auto`,
          textAlign: [`inherit`, `right`],
          "& #item-tag": {
            alignSelf: `flex-end`,
          },
        }}
      >
        {showTags && post.tags?.length ? (
          <ItemTag tag={post?.tags[0]} />
        ) : (
          <div />
        )}
        <time
          sx={{
            color: `secondary`,
            fontSize: [1, 1, 2],
            paddingLeft: [`0.75rem`],
          }}
        >
          {post.date}
        </time>
      </Box>
    </Box>
  );
};

export default BlogListItem;
