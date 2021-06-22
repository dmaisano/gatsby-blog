import { graphql } from "gatsby";
import HomepageComponent from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/homepage";

export default HomepageComponent;

export const query = graphql`
  query HomepageQuery($formatString: String!) {
    allPost: allPost(sort: { fields: date, order: DESC }, limit: 3) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/projects/" }
        slug: {
          in: [
            "reddit-clone/"
            "njit-capstone-project/"
            "travel-site/"
            "gatsby-blog/"
          ]
        }
      }
      sort: { fields: frontmatter___index, order: ASC }
    ) {
      nodes {
        slug
        frontmatter {
          title
          description
          banner {
            childImageSharp {
              gatsbyImageData(
                width: 768
                placeholder: BLURRED
                blurredOptions: { width: 100 }
              )
            }
          }
          href
          repo
        }
      }
    }
  }
`;
