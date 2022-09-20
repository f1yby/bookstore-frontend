import { Avatar, Button, Col, Dropdown, Input, Row, Typography } from 'antd';
import {
  BookOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { UserService, UserType } from '@/service/UserService';

export const layout = () => {
  console.log(UserService.getUserType());
  console.log(UserService.getUserType() == UserType.admin);
  console.log(UserService.getUserType() == UserType.admin);
  return {
    logo: <BookOutlined />,
    menuDataRender: () => {
      if (
        UserService.getUserType() === UserType.user ||
        UserService.getUserType() === UserType.unknown
      ) {
        return [
          {
            path: '/search',
            name: 'Search',
            icon: <SearchOutlined />,
          },
          {
            path: '/cart',
            name: 'Cart',
            icon: <ShoppingCartOutlined />,
          },
          {
            path: '/order',
            name: 'Order',
            icon: <ShoppingCartOutlined />,
          },
          {
            path: '/statistics',
            name: 'Statistics',
            icon: <AlignLeftOutlined />,
          },
        ];
      } else {
        return [
          {
            path: '/manage/book',
            name: 'Manage Book',
            icon: <SearchOutlined />,
          },
          {
            path: '/manage/user',
            name: 'Manage User',
            icon: <UserOutlined />,
          },
          {
            path: '/manage/topseller',
            name: 'Top Seller',
            icon: <BookOutlined />,
          },
          {
            path: '/manage/order',
            name: 'Manage Order',
            icon: <ShoppingCartOutlined />,
          },
        ];
      }
    },
    rightContentRender: () => (
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col>
          <Dropdown
            overlay={() => {
              if (
                UserService.getUserType() == UserType.user ||
                UserService.getUserType() == UserType.admin
              ) {
                return (
                  <>
                    <Button block type={'primary'} onClick={UserService.Logout}>
                      Logout
                    </Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
                      block
                      type={'primary'}
                      onClick={() => history.push('/signup')}
                    >
                      Sign Up
                    </Button>
                    <Button onClick={() => history.push('/login')} block>
                      Login
                    </Button>
                  </>
                );
              }
            }}
            placement={'bottom'}
          >
            <Avatar
              shape="square"
              size={'default'}
              icon={
                UserService.getUserType() == UserType.user ||
                UserService.getUserType() == UserType.admin ? (
                  <Typography.Text style={{ margin: '3px' }}>
                    {UserService.getUserData().username}
                  </Typography.Text>
                ) : (
                  <UserOutlined />
                )
              }
            />
          </Dropdown>
        </Col>
        {
          <Col>
            <Input.Search
              style={{ verticalAlign: 'middle' }}
              onSearch={(e: string) => {
                history.push({ pathname: '/search', query: { keyword: e } });
              }}
              enterButton
            />
          </Col>
        }
      </Row>
    ),
    icon: <BookOutlined />,
  };
};
