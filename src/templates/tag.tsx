/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
import Listing from "../components/listing";
import Seo from "../components/seo";
import Title from "../components/title";
import { ItemTagType, MdxPostType } from "../types";
import { useSiteMetadata } from "../utils";

const TagTemplate = ({
  data,
  pageContext,
}: PageProps<
  {
    posts: {
      nodes: MdxPostType[];
    };
  },
  ItemTagType
>) => {
  const { tagsPath } = useSiteMetadata();

  return (
    <Layout>
      <Seo title={`Tag: ${pageContext.name}`} />

      <Title as="h1" text={pageContext.name}>
        <GatsbyLink to={tagsPath}>View all tags</GatsbyLink>
      </Title>

      <Listing data={data.posts.nodes} _sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default TagTemplate;

export const query = graphql`
  query TagQuery($slug: String!) {
    posts: allPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        slug
        title
        date(formatString: "MMM D, YYYY")
        tags {
          name
          slug
        }
      }
    }
  }
`;
