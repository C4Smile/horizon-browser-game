// components
import Content from "./Content";
import Tabs from "./Tabs";

// types
import { TabComponentProps } from "./types";

/**
 * TabComponent
 * @param props - Props
 * @returns TabComponent component
 */
function TabComponent(props: TabComponentProps) {
  const { currentTab, onChange, tabs, content } = props;

  return (
    <div>
      <Tabs tabs={tabs} currentTab={currentTab} onChange={onChange} />
      <Content content={content} />
    </div>
  );
}

export default TabComponent;
