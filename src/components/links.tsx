/** @jsx jsx */
import { GatsbyLinkProps as GLinkProps, Link as GLink } from "gatsby";
import React, { AnchorHTMLAttributes } from "react";
import { jsx, Link as TLink, ThemeUIStyleObject } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui";

interface GatsbyLinkProps
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
  return (
    <GLink
      to={to}
      sx={{
        ...theme.styles.a,
        ...sx,
      }} /** => Add default styles before the sx  **/
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </GLink>
  );
};

export const ThemeLink = TLink;
