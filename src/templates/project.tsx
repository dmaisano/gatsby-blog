import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import { graphql, PageProps } from "gatsby";
import React from "react";
import { Heading } from "theme-ui";
import { ProjectQueryResult } from "../types/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface ProjectProps {}

const Project = ({
  data,
}: PageProps<{
  project: ProjectQueryResult;
}>) => {
  const { project } = data;

  return (
    <Layout>
      <Seo
        title={project.frontmatter.title}
        description={project.frontmatter.description}
        // image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={project.slug}
      />
      <Heading
        as="h1"
        variant="styles.h1"
        sx={{
          color: [`text`, `text`, `primary`],
        }}
      >
        {project.frontmatter.title}
      </Heading>

      <GatsbyImage
        image={getImage(project.frontmatter.banner)}
        alt={project.slug}
      />
    </Layout>
  );
};

export default Project;

export const query = graphql`
  query Project($slug: String!) {
    project: mdx(slug: { eq: $slug }) {
      slug
      frontmatter {
        title
        description
        banner {
          childImageSharp {
            gatsbyImageData(
              width: 300
              height: 169
              placeholder: BLURRED
              blurredOptions: { width: 60 }
            )
          }
        }
        href
        repo
      }
    }
  }
`;
