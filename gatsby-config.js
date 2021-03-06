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
    tagsPath: `/tags`,
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
        name: `Contact 📧`,
        url: `mailto:dmaisanooo@gmail.com?subject=I'd like to get in touch`,
      },
      {
        name: `Github`,
        url: `https://github.com/dmaisano`,
      },
    ],
  },
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#improved-fast-refresh-integration
  flags: {
    FAST_DEV: true,
    LAZY_IMAGES: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {},
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `content/data`,
      },
      __key: `data`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `content/posts`,
      },
      __key: `posts`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `content/pages`,
      },
      __key: `pages`,
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
