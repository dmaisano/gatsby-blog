/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Listing from "../components/listing";
import Seo from "../components/seo";
import Title from "../components/title";
import { ProjectType } from "../types";

interface QueryResult {
  projects: {
    nodes: ProjectType[];
  };
}

const ProjectsPage = ({ data }: PageProps<QueryResult>) => {
  return (
    <Layout>
      <Seo title="Projects" />

      <Title text="Projects" />
      <Listing data={data.projects.nodes} />
    </Layout>
  );
};

export default ProjectsPage;

export const query = graphql`
  query ProjectsPageQuery {
    projects: allProjectsJson(sort: { fields: priority, order: ASC }) {
      nodes {
        title
        description
        description
        href
        repo
      }
    }
  }
`;
