/** @jsx jsx */
import { kebabCase } from "lodash";
import { jsx } from "theme-ui";
import { MdxPostType, ProjectType } from "../types";
import MdxPost from "./post-listing";
import ProjectListing from "./project-listing";

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
    <ol
      sx={{
        p: 0,
        m: 0,
        listStyle: `none`,
        ":not(:last-of-type)": {
          mb: 6,
        },
      }}
      className={className}
    >
      {data.length &&
        data.map((item) =>
          isPost(item) ? (
            <MdxPost key={item.slug} post={item} showTag={showTag} />
          ) : (
            <ProjectListing key={kebabCase(item.title)} project={item} />
          ),
        )}
    </ol>
  );
};

export default Listing;
