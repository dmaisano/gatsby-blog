/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
import Listing from "../components/listing";
import Seo from "../components/seo";
import Title from "../components/title";
import { MdxPostType } from "../types";
import { useSiteMetadata } from "../utils";

interface QueryResult {
  posts: {
    nodes: MdxPostType[];
  };
}

const PostsPage = ({ data }: PageProps<QueryResult>) => {
  const { tagsPath } = useSiteMetadata();

  return (
    <Layout>
      <Seo title="Posts" />

      <Title text="Posts">
        <GatsbyLink to={tagsPath}>View all tags</GatsbyLink>
      </Title>
      <Listing data={data.posts.nodes} showTag={true} />
    </Layout>
  );
};

export default PostsPage;

export const query = graphql`
  query PostsPageQuery {
    posts: allPost(sort: { fields: date, order: DESC }) {
      nodes {
        slug
        title
        date(formatString: "MMM D, YYYY")
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`;
