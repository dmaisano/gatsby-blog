/** @jsx jsx */
import { graphql, PageProps } from "gatsby";
import { kebabCase } from "lodash";
import { Box, Flex, jsx, Text } from "theme-ui";
import Layout from "../components/layout";
import { GatsbyLink } from "../components/links";
import Seo from "../components/seo";
import Title from "../components/title";
import { ItemTagType } from "../types";
import { useSiteMetadata } from "../utils";

interface QueryResult {
  tags: {
    group: {
      fieldValue: ItemTagType["name"];
      totalCount: number;
    }[];
  };
}

const TagsPage = ({ data }: PageProps<QueryResult>) => {
  const { tagsPath } = useSiteMetadata();

  return (
    <Layout>
      <Seo title="Tags" />

      <Title text="Tags" />
      <Box mt={[4, 5]}>
        {data.tags.group.map((listItem) => (
          <Flex
            key={listItem.fieldValue}
            mb={[1, 1, 2]}
            sx={{ alignItems: `center` }}
          >
            <GatsbyLink
              sx={{ variant: `links.list_item`, mr: 2 }}
              to={`/${tagsPath}/${kebabCase(listItem.fieldValue)}`}
            >
              {listItem.fieldValue}{" "}
              <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </GatsbyLink>
          </Flex>
        ))}
      </Box>
    </Layout>
  );
};

export default TagsPage;

export const query = graphql`
  query TagsPageQuery {
    tags: allPost(sort: { fields: tags___name, order: DESC }) {
      group(field: tags___name) {
        fieldValue
        totalCount
      }
    }
  }
`;
