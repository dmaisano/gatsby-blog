const siteTitle = `dmaisano`;
const siteDescription = `personal site & blog`;

siteDescription;
module.exports = {
  siteMetadata: {
    siteTitle,
    siteTitleAlt: siteTitle,
    siteHeadline: `${siteTitle} | ${siteDescription}`,
    siteUrl: `https://dmaisano.dev`,
    siteDescription: `personal site & blog`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    // twitter handle, skipping since I don't use twitter
    author: ``,
    basePath: `/`,
    blogPath: `/posts`,
    navigation: [
      {
        title: `Posts`,
        slug: `/posts`,
      },
      {
        title: `About`,
        slug: `/about`,
      },
      {
        title: `Projects`,
        slug: `/projects`,
      },
    ],
    externalLinks: [
      {
        name: `Github`,
        url: `https://github.com/dmaisano`,
      },
      // TODO: add email link
    ],
  },
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#improved-fast-refresh-integration
  flags: {
    FAST_DEV: true,
    LAZY_IMAGES: true,
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./content/posts/`,
      },
      // __key: `posts`,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
  ],
};
