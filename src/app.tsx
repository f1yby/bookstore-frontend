import {Avatar, Button, Col, Dropdown, Input, Row} from "antd";
import {BookOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {history} from 'umi';


export const layout = () => {
  return {
    logo: <BookOutlined/>,
    menuDataRender: () => [ //此功能可以实现动态路由，用来渲染访问路由
      {
        path: '/search',
        name: 'Search',
        icon: <SearchOutlined/>
      },
      {
        path: '/cart',
        name: 'Cart',
        icon: <ShoppingCartOutlined/>
      },
      {
        path: '/'
      }
    ]
    ,
    rightContentRender: () => (
      <Row gutter={{xs: 8, sm: 16, md: 24}}>

        <Col>
          <Dropdown
            overlay={<><Button block type={'primary'} onClick={() => history.push('/signup')}>Sign Up</Button><Button
              onClick={() => history.push('/login')} block>Login</Button></>} placement={'bottom'}>
            <Avatar shape="square" size={"default"} icon={<UserOutlined/>}/>
          </Dropdown>

        </Col>
        {history.location.pathname === '/search' ? <></> : <Col>
          <Input.Search style={{verticalAlign: 'middle'}}
                        onSearch={(e: string) => {
                          history.push({pathname: '/search', query: {keyword: e}});
                        }}
                        enterButton
          />
        </Col>}
      </Row>
    ),
    icon: <BookOutlined/>
  }
};
