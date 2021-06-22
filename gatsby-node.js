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

// /** @param {gatsby.CreatePageArgs}  */
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions;

//   const result = await graphql(/* GraphQL */ `
//     query CreateProjects {
//       projects: allMdx(
//         filter: { fileAbsolutePath: { regex: "/content/projects//" } }
//       ) {
//         nodes {
//           slug
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading the projects`,
//       result.errors
//     );
//     return;
//   }

//   const projectSlugs = result.data.projects.nodes;
//   const projectTemplate = require.resolve("./src/templates/project.tsx");

//   projectSlugs.forEach(({ slug }) => {
//     createPage({
//       path: `/projects/${slug}`.replace(/\/\/+/g, `/`),
//       component: projectTemplate,
//       context: {
//         slug,
//       },
//     });
//   });
// };
