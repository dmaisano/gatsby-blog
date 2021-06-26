/** @jsx jsx */
import { jsx } from "theme-ui";
import { MdxPostType, ProjectType } from "../types";
import MdxPost from "./mdx-post";

function isPost(object: MdxPostType | ProjectType): object is MdxPostType {
  return (object as MdxPostType).date !== undefined;
}

interface ListingProps {
  data: MdxPostType[] | ProjectType[];
  className?: string;
  showTag?: boolean;
}

const Listing: React.FC<ListingProps> = ({
  data,
  className = ``,
  showTag = true,
}) => {
  return (
    <section sx={{ mb: [5, 6, 7] }} className={className}>
      {data.length &&
        data.map((item) =>
          isPost(item) ? (
            <MdxPost key={item.slug} post={item} showTag={showTag} />
          ) : (
            <div>project placeholder</div>
          ),
        )}
    </section>
  );
};

export default Listing;
