/** @jsx jsx */
import BlogListItem from "./blog-list-item";
import { jsx } from "theme-ui";
import { MdxPost } from "../../../types/types";

type ListingProps = {
  posts: MdxPost[];
  className?: string;
  showTags?: boolean;
};

const Listing: React.FC<ListingProps> = ({
  posts,
  className = ``,
  showTags = true,
}) => (
  <section sx={{ mb: [5, 6] }} className={className}>
    {posts.map((post) => (
      <BlogListItem key={post.slug} post={post} showTags={showTags} />
    ))}
  </section>
);

export default Listing;
