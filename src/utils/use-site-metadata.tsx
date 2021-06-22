import { graphql, useStaticQuery } from "gatsby";

interface ISiteMetadata {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteTitleAlt: string;
      siteHeadline: string;
      siteUrl: string;
      siteDescription: string;
      siteLanguage: string;
      siteImage: string;
      author: string;
      basePath: string;
      blogPath: string;
      navigation: {
        title: string;
        slug: string;
      }[];
      externalLinks: {
        name: string;
        url: string;
      }[];
      [key: string]: unknown;
    };
  };
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<ISiteMetadata>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteLanguage
          siteImage
          author
          basePath
          blogPath
          navigation {
            title
            slug
          }
          externalLinks {
            name
            url
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
