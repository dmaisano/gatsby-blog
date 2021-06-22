/** @jsx jsx */
import { jsx, ThemeUIStyleObject, Link as TLink } from "theme-ui";
import { AnchorHTMLAttributes } from "react";
import {
  Link as GatsbyLink,
  GatsbyLinkProps as GatsbyLinkSourceProps,
} from "gatsby";
import theme from "../gatsby-plugin-theme-ui";

interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    GatsbyLinkSourceProps<{}> {
  sx?: ThemeUIStyleObject;
}

const Link: React.FC<LinkProps> = ({ children, to, sx, ...props }) => {
  return (
    <GatsbyLink
      to={to}
      sx={{
        ...theme.styles.a,
        ...sx,
      }} /** => Add default styles before the sx  **/
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </GatsbyLink>
  );
};

export default Link;
