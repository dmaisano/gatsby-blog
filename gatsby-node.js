const gatsby = require("gatsby");
const { kebabCase } = require("lodash");

const basePath = `/`;
const blogPath = `/posts`;
const tagsPath = `/tags`;

const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return result;
  };

const slugify = (source) => {
  const slug = source.slug ? source.slug : kebabCase(source.title);

  return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`);
};

/**
 * Create general interfaces that you could can use to leverage other data sources the core theme sets up MDX as a type for the general interface
@param {gatsby.CreateSchemaCustomizationArgs} */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: `slugify`,
    extend() {
      return {
        resolve: slugify,
      };
    },
  });

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createTypes(/* GraphQL */ `
    interface Post implements Node {
      id: ID!
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    type PostTag {
      name: String
      slug: String
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String!
        @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    interface Page implements Node {
      id: ID!
      slug: String
      title: String!
      excerpt(pruneLength: Int = 160): String!
      body: String!
    }

    type MdxPage implements Node & Page {
      slug: String
      title: String!
      excerpt(pruneLength: Int = 140): String!
        @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
    }
  `);
};

/** @param {gatsby.CreateNodeArgs} */
exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode, createParentChildLink } = actions;

  // skip non-Mdx nodes
  if (node.internal.type !== `Mdx`) {
    return;
  }

  const fileNode = getNode(node.parent);
  /** @type {"posts" | "pages"} */
  const source = fileNode.sourceInstanceName;

  // check if post, if so create "Post" type
  if (node.internal.type === `Mdx` && source === "posts") {
    let modifiedTags;

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
    };

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPostId) });
  }

  // check if page, if so create "Page" type
  else if (node.internal.type === `Mdx` && source === "pages") {
    /** @type {string} */
    const absolutePath = fileNode.absolutePath;

    const result = absolutePath.match(
      new RegExp(`content/pages/([a-zA-Z_-]+)/?.*\.mdx?`),
    );

    if (
      !result ||
      (result && (result.length < 2 || result[1] === "" || result[1] === null))
    ) {
      reporter.panicOnBuild(
        `There was an error processing the page at the following path: ${absolutePath}`,
      );
      return;
    }

    const slug = slugify({ slug: result[1] }) || "";
    const fieldData = {
      title: node.frontmatter.title,
      slug,
    };

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

const pageTemplate = require.resolve("./src/templates/page.tsx");
const postTemplate = require.resolve("./src/templates/post.tsx");

/** @param {gatsby.CreatePagesArgs} */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(/* GraphQL */ `
    query CreatePagesQuery {
      pages: allPage {
        nodes {
          slug
        }
      }
      posts: allPost {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your posts or pages`,
      result.errors,
    );
    return;
  }

  const pages = result.data.pages.nodes;
  const posts = result.data.posts.nodes;

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: `/${basePath}/${page.slug}`.replace(/\/\/+/g, `/`),
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
      });
    });
  }

  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: `/${basePath}/${post.slug}`.replace(/\/\/+/g, `/`),
        component: postTemplate,
        context: {
          slug: post.slug,
        },
      });
    });
  }
};
