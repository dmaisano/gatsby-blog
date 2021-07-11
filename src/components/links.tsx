/** @jsx jsx */
import { GatsbyLinkProps as GLinkProps, Link as GLink } from "gatsby";
import React, { AnchorHTMLAttributes } from "react";
import { jsx, Link as TLink, LinkProps, ThemeUIStyleObject } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui";

export interface GatsbyLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    GLinkProps<{}> {
  sx?: ThemeUIStyleObject;
  hasBorder?: boolean;
}

export const GatsbyLink: React.FC<GatsbyLinkProps> = ({
  children,
  to,
  sx,
  hasBorder,
  ...props
}) => {
  return (
    <GLink
      to={to}
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

export const ThemeLink: React.FC<
  LinkProps & {
    hasBorder: boolean;
  }
> = ({ hasBorder, ...props }) => {
  return (
    <TLink
      sx={{
        color: `inherit`,
      }}
      {...props}
    ></TLink>
  );
};
