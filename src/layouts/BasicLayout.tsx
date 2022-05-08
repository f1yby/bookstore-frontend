import {ReactChild, ReactFragment, ReactPortal} from "react";
import ProLayout from "@ant-design/pro-layout";

export default (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
  return <ProLayout style={{
    height: '100vh',
    border: '0',
  }}>{props.children}</ProLayout>;
}
