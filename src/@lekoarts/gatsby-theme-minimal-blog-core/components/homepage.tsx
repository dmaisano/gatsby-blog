import { PageProps } from "gatsby";
import React from "react";
import Projects from "../../../components/projects";
import { MdxPost, ProjectQueryResult } from "../../../types/types";
import Homepage from "../../gatsby-theme-minimal-blog/components/homepage";

export default function MinimalBlogCoreHomepage(
  props: PageProps<{
    allPost: {
      nodes: MdxPost[];
    };
    projects: {
      nodes: ProjectQueryResult[];
    };
  }>
) {
  const {
    data: { allPost, projects },
  } = props;

  return (
    <Homepage posts={allPost.nodes} projects={projects.nodes} {...props} />
  );
}
