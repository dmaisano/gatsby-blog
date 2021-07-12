/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { Heading, jsx } from "theme-ui";
import projectsJSON from "../../content/projects.json";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
import Listing from "../components/listing";
import Title from "../components/title";
import { visuallyHidden } from "../styles";
import { MdxPostType } from "../types";
import { useSiteMetadata } from "../utils";

const Hero: React.FC = () => (
  <Heading
    as="h2"
    sx={{
      fontWeight: `bold`,
      m: 0,
    }}
    variant="styles.h2"
  >
    Domenico Maisano 🌊
  </Heading>
);

interface QueryResult {
  posts: {
    nodes: MdxPostType[];
  };
}

const IndexPage = ({ data }: PageProps<QueryResult>) => {
  const { blogPath, siteTitle } = useSiteMetadata();

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
        <GatsbyLink to={blogPath}>Read all posts</GatsbyLink>
      </Title>
      <Listing data={data.posts.nodes} showTag={true} />

      <Title text="Projects" />
      <Listing data={projectsJSON} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
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
