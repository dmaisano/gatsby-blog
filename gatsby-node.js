const gatsby = require("gatsby");
const { kebabCase } = require("lodash");
const { normalize: pathNormalize } = require("path");

const basePath = `/`;

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

/**
 * Create general interfaces that you could can use to leverage other data sources the core theme sets up MDX as a type for the general interface
@param {gatsby.CreateSchemaCustomizationArgs} */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  const slugify = (source) => {
    const slug = source.slug ? source.slug : kebabCase(source.title);

    return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`);
  };

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
  `);
};

/** @param {gatsby.CreateNodeArgs} */
exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  // skip non-Mdx nodes
  if (node.internal.type !== `Mdx`) {
    return;
  }

  const fileNode = getNode(node.parent);

  /** @type {string} */
  const absolutePath = pathNormalize(fileNode.absolutePath);

  // mdx post logic
  if (
    node.internal.type === `Mdx` &&
    absolutePath.includes(pathNormalize(`${__dirname}/content/posts`))
  ) {
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
};
