/** @jsx jsx */
import { kebabCase } from "lodash";
import { jsx, ThemeUIStyleObject } from "theme-ui";
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
  limit?: number;
  _sx?: ThemeUIStyleObject;
}

const Listing: React.FC<ListingProps> = ({
  data,
  className = ``,
  showTag = true,
  limit = -1,
  _sx,
}) => {
  data = limit > 0 ? data.slice(0, limit) : data;

  return (
    <ol
      sx={{
        p: 0,
        m: 0,
        listStyle: `none`,
        ":not(:last-of-type)": {
          mb: 6,
        },
        ..._sx,
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
