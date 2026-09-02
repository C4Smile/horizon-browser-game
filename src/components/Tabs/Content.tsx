// types
import { ContentProps } from "./types";

/**
 * Content
 * @param props - Props
 * @returns Content component
 */
function Content(props: ContentProps) {
  const { content } = props;

  return <div>{content}</div>;
}

export default Content;
