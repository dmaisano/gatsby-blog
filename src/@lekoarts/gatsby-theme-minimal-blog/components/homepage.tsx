/** @jsx jsx */
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import { visuallyHidden } from "../styles/utils";
import Projects from "../../../components/projects";
import Hero from "../texts/hero.mdx";
import Listing from "./listings";
import List from "./list";

type PostsProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  [key: string]: any;
};

const Homepage: React.FC<PostsProps> = ({ posts }) => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const { siteTitle } = useSiteMetadata();

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
      <Listing posts={posts} showTags={false} />
      <Title text="Projects">
        <Link to={replaceSlashes(`/${basePath}/projects`)}>
          View All Projects
        </Link>
      </Title>
      <List sx={{ variant: `section_bottom` }}>
        <Projects limit={5} />
      </List>
    </Layout>
  );
};

export default Homepage;
