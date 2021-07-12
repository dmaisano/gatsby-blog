/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
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
  const { blogPath } = useSiteMetadata();

  return (
    <Layout>
      <Seo title="Posts" />

      <Title text="Posts">
        <GatsbyLink to={blogPath}>Read all posts</GatsbyLink>
      </Title>
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
