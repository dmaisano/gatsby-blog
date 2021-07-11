/** @jsx jsx */
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Heading, jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { MdxPageType } from "../types";

const PageTemplatePage = ({
  data: { page },
}: PageProps<{ page: MdxPageType }>) => {
  return (
    <Layout>
      <Seo title={page.title} description={page.excerpt} />
      <Heading as="h1" sx={{ textAlign: `center` }} variant="styles.h1">
        {page.title}
      </Heading>
      <section sx={{ my: 5, variant: `layout.content` }}>
        <MDXRenderer>{page.body}</MDXRenderer>
      </section>
    </Layout>
  );
};

export default PageTemplatePage;

export const query = graphql`
  query PageQuery($slug: String!) {
    page(slug: { eq: $slug }) {
      title
      slug
      excerpt
      body
    }
  }
`;
