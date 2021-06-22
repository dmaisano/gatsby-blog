/** @jsx jsx */
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import Projects from "../../../components/projects";
import { MdxPost, ProjectQueryResult } from "../../../types/types";
import { visuallyHidden } from "../styles/utils";
import Hero from "../texts/hero.mdx";
import List from "./list";
import Listing from "./listing";
import Title from "./title";

type PostsProps = {
  posts: MdxPost[];
  projects: ProjectQueryResult[];
  [key: string]: any;
};

const Homepage: React.FC<PostsProps> = ({ posts, projects }) => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const { siteTitle } = useSiteMetadata();

  // console.log(projects);

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section
        sx={{
          mb: [5, 6],
          p: { fontSize: [1, 2, 3], mt: 2 },
          variant: `section_hero`,
        }}
      >
        <Hero />
      </section>

      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          Read all posts
        </Link>
      </Title>
      <Listing posts={posts} showTags={true} />
      <Title text="Projects">
        <Link to={replaceSlashes(`/${basePath}/projects`)}>
          View All Projects
        </Link>
      </Title>
      <List sx={{ variant: `section_bottom` }}>
        <Projects projects={projects} />
      </List>
    </Layout>
  );
};

export default Homepage;
