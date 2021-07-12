/** @jsx jsx */
import { PageProps } from "gatsby";
import { jsx } from "theme-ui";
import projectsJSON from "../../content/projects.json";
import Layout from "../components/layout";
import Listing from "../components/listing";
import Seo from "../components/seo";
import Title from "../components/title";

const ProjectsPage = ({ ...props }: PageProps) => {
  return (
    <Layout>
      <Seo title="Projects" />

      <Title text="Projects" />
      <Listing data={projectsJSON} />
    </Layout>
  );
};

export default ProjectsPage;
