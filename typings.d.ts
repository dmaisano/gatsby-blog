import { ProjectType } from "./src/types";

// declare module "react" {
//   interface Attributes extends SxProp {}
// }

declare module "content/projects.json" {
  let projects: () => ProjectType[];
  export default projects;
}
