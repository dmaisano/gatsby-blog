const gatsby = require("gatsby");
const kebabCase = require("lodash.kebabcase");

/** @param {gatsby.CreateSchemaCustomizationArgs}  */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(/* GraphQL */ `
    interface Post implements Node {
      fields: PostFields
    }

    type PostFields {
      tag: PostTag
    }

    type PostTag {
      name: String
      slug: String
    }

    type MdxPost implements Node & Post {
      fields: PostFields
    }
  `);
};

/**
 * Modifying the mdx nodes created by '@lekoarts/gatsby-theme-minimal-blog-core'
 * @param {gatsby.CreateNodeArgs} */
exports.onCreateNode = ({ node, actions, getNode }) => {
  // skip nodes that aren't of type 'MdxPost'
  if (node.internal.type !== `MdxPost`) {
    return;
  }

  const parentNode = getNode(node.parent);

  if (!parentNode) {
    return;
  }

  const postTag = parentNode.frontmatter.tag;

  if (postTag === "") {
    return;
  }

  const tag = {
    name: postTag,
    slug: kebabCase(postTag),
  };

  actions.createNodeField({
    node,
    name: `tag`,
    value: tag,
  });
};
