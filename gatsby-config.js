module.exports = {
  siteMetadata: {
    title: `dmaisano`,
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
