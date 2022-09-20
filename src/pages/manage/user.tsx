import React, { Component, useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Input,
  Layout,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import {
  ArrowRightOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { history, useLocation } from 'umi';
import {
  UserData,
  UserDataWithBuyAmount,
  UserService,
} from '@/service/UserService';
import PageSwitcher from '@/components/PageSwitcher';
import { BookService } from '@/service/BookService';
import User from '@/pages/manage/user';

const { Footer, Content } = Layout;
const RangePicker: any = DatePicker.RangePicker;

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    render: (book: string) => (
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.push({ pathname: '/search', query: { keyword: book } });
        }}
      >
        {book}
      </span>
    ),
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
  },
  {
    title: 'Buy Amount',
    dataIndex: 'buyAmount',
    sorter: (a: { buyAmount: number }, b: { buyAmount: number }) =>
      a.buyAmount - b.buyAmount,
  },
  {
    title: 'Action',
    dataIndex: 'uid',
    render: (uid: number) => {
      return (
        <Space>
          <Button
            onClick={() => {
              UserService.setPermission(uid, 'Banned');
            }}
          >
            Ban
          </Button>
          <Button
            onClick={() => {
              UserService.setPermission(uid, 'Normal');
            }}
          >
            Unban
          </Button>
        </Space>
      );
    },
  },
];

export default () => {
  // @ts-ignore
  const [userData, setUserData] = useState<UserDataWithBuyAmount[]>();
  useEffect(() => {
    UserService.getAllUsers(setUserData);
  }, []);

  return (
    <Layout>
      <Layout.Content style={{ padding: '0 10vw 0' }}>
        <Row
          align={'middle'}
          style={{ padding: '5vh 0 5vh' }}
          justify={'space-between'}
        >
          <Col style={{ alignContent: 'center' }}>
            <RangePicker
              onChange={(dates: any, dateStrings: [string, string]) =>
                UserService.getAllUsersByTimePeriod(dateStrings, setUserData)
              }
            />
          </Col>
        </Row>
        <Table
          tableLayout={'auto'}
          dataSource={userData}
          columns={columns}
          pagination={{ hideOnSinglePage: true, position: ['bottomCenter'] }}
        />
      </Layout.Content>
    </Layout>
  );
};
