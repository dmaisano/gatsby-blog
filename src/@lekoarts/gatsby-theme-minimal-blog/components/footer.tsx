/** @jsx jsx */
import { jsx } from "theme-ui";

const Footer: React.FC = () => {
  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        mt: [6],
        color: `secondary`,
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} Domenico Maisano. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
