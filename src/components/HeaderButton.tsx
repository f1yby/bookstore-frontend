import {Button} from 'antd';
import {ReactChild, ReactFragment, ReactPortal} from 'react';

export default (props: {
  children:
    | string
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  onClick: () => {} | any
}) => {
  return <Button type="text" style={{margin: '0 10px 0'}} onClick={() => props.onClick()}>{props.children}</Button>;
};
