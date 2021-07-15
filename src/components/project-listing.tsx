import React from "react";
import { Box, Flex, Heading, Text, ThemeUIStyleObject } from "theme-ui";
import { ProjectType } from "../types";
import { ThemeLink } from "./links";

interface ProjectListingProps {
  project: ProjectType;
  _sx?: ThemeUIStyleObject;
}

const ProjectListing: React.FC<ProjectListingProps> = ({ project, _sx }) => {
  const { title, description, href, repo } = project;

  return (
    <Box
      as="li"
      sx={{
        display: [`block`, `block`, `block`, `flex`],
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-between`,
        ..._sx,
      }}
      variant="list_item"
    >
      <Box>
        <Heading
          as="h3"
          sx={{
            fontWeight: `medium`,
            pb: 2,
            m: 0,
          }}
          variant="styles.h3"
        >
          {title}
        </Heading>
        <Text as="p" sx={{ fontSize: [1, 1, 2], pb: [2, 2, 2, 0] }}>
          {description}
        </Text>
      </Box>
      <Flex
        sx={{
          minWidth: `fit-content`,
          flexDirection: [`row`, `row`, `row`, `column`],
          alignItems: [`center`, `center`, `center`, `flex-end`],
        }}
      >
        {href ? (
          <ThemeLink
            href={href}
            sx={{
              variant: `links.item_tag`,
              mr: [2, 2, 2, 0],
              mb: [0, 0, 0, 2],
            }}
          >
            View Live
          </ThemeLink>
        ) : null}
        {repo ? (
          <ThemeLink
            href={repo}
            sx={{
              variant: `links.item_tag.source_code`,
            }}
          >
            Source Code
          </ThemeLink>
        ) : null}
      </Flex>
    </Box>
  );
};

export default ProjectListing;
