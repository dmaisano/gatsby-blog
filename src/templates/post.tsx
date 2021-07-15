/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Heading, jsx } from "theme-ui";
import ItemTags from "../components/item-tags";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { MdxPostType } from "../types";
import prismTheme from "prism-react-renderer/themes/nightOwl";

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const PostTemplate = ({ data: { post } }: PageProps<{ post: MdxPostType }>) => {
  if (!post.body) {
    return;
  }

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.description ?? post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
      />

      <Heading as="h1" variant="styles.h1">
        {post.title}
      </Heading>

      <p
        sx={{
          color: `secondary`,
          mt: 3,
          a: { color: `secondary` },
          fontSize: [1, 1, 2],
        }}
      >
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
        {post.timeToRead && ` — `}
        {post.timeToRead && <span>{post.timeToRead} min read</span>}
      </p>

      <section
        sx={{
          my: 5,
          ".gatsby-resp-image-wrapper": {
            my: [4, 4, 5],
            boxShadow: shadow.join(`, `),
          },
          variant: `layout.content`,
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query PostQuery($slug: String!) {
    post: mdxPost(slug: { eq: $slug }) {
      slug
      title
      date(formatString: "MMM D, YYYY")
      tags {
        name
        slug
      }
      description
      canonicalUrl
      body
      excerpt
      timeToRead
      banner {
        childImageSharp {
          resize(width: 1200, quality: 90) {
            src
          }
        }
      }
    }
  }
`;
