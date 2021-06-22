/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { Heading, jsx, Text } from "theme-ui";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
import Title from "../components/title";
import { visuallyHidden } from "../styles";
import { MdxPost } from "../types";
import { replaceSlashes, useSiteMetadata } from "../utils";

const Hero: React.FC = () => (
  <Text
    sx={{
      fontSize: [4, 5, 6],
      fontWeight: `bold`,
      color: `heading`,
    }}
  >
    Domenico Maisano 🌊
  </Text>
);

interface QueryResult {
  posts: MdxPost[];
}

const IndexPage = ({ data }: PageProps<QueryResult>) => {
  const { basePath, blogPath, siteTitle } = useSiteMetadata();

  return (
    <Layout>
      <Heading as="h1" sx={visuallyHidden}>
        {siteTitle}
      </Heading>
      <section
        sx={{
          mb: [5, 6],
          p: { fontSize: [1, 2, 3], mt: 2 },
          textAlign: `center`,
          variant: `section_hero`,
        }}
      >
        <Hero />
      </section>

      <Title text="Latest Posts">
        <GatsbyLink to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          Read all posts
        </GatsbyLink>
      </Title>
      {/* <Listing posts={data.posts} showTags={true} /> */}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomepageQuery {
    posts: allPost(sort: { fields: date, order: DESC }, limit: 3) {
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
