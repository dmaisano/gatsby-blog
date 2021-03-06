/** @jsx jsx */
import { GatsbyLinkProps as GLinkProps, Link as GLink } from "gatsby";
import React, { AnchorHTMLAttributes } from "react";
import { jsx, Link as TLink, LinkProps, ThemeUIStyleObject } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui";
import { replaceSlashes, useSiteMetadata } from "../utils";

export interface GatsbyLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    GLinkProps<{}> {
  sx?: ThemeUIStyleObject;
}

export const GatsbyLink: React.FC<GatsbyLinkProps> = ({
  children,
  to,
  sx,
  ...props
}) => {
  const { basePath } = useSiteMetadata();

  return (
    <GLink
      to={replaceSlashes(`/${basePath}/${to}`)}
      sx={{
        ...theme.styles?.a,
        ...sx,
        color: `inherit`,
      }} /** => Add default styles before the sx  **/
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </GLink>
  );
};

export const ThemeLink: React.FC<LinkProps> = (props) => {
  return (
    <TLink
      sx={{
        color: `inherit`,
      }}
      {...props}
    ></TLink>
  );
};
