import React, {useState} from 'react';
import {Button, Col, Layout, Row, Space, Table} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {history} from "umi";

const columns = [
  {
    title: 'Book',
    dataIndex: 'bookName',
    render: (book: string) => <span
      style={{cursor: 'pointer'}}
      onClick={() => history.push({pathname: '/search', query: {keyword: book}})}>{book}</span>
  },
  {
    title: 'Writer',
    dataIndex: 'writers',
    render: (writers: string[]) => {
      let ans: JSX.Element[] = [];
      writers.forEach(writer => ans.push(<Button
        type={'text'} onClick={() => history.push({
        pathname: '/search',
        query: {keyword: writer}
      })}>{writer}</Button>));
      return <Space>{ans}</Space>;
    }

  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a: { price: number; }, b: { price: number; }) => a.price - b.price
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Action',
    dataIndex: 'bId',
    render: (bId: number) => {
      return <Space>
        <Button type={'text'} onClick={() => {
        }}>add</Button>
        <Button type={'text'} onClick={() => {
        }}>remove</Button>
      </Space>
    }
  }
]
const dataSource = [
  {
    key: 0,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 1,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 2,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 3,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 4,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 5,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 6,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 7,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 8,
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  },
  {
    key: 9,
    bookName: 'Basdk',
    writers: ['aaa', 'bbb'],
    price: 70,
    count: 1,
  }
];
export default function Page() {
  const [rowSelectionState, setRowSelectionState] = useState<React.Key[]>([0]);
  console.log(rowSelectionState);
  return (
    <Layout>
      <Layout.Content style={{padding: '0 10vw', height: '80vh'}}>
        <Row align={'middle'}>
          <Col>
            <ShoppingCartOutlined style={{fontSize: '500%'}}/>
          </Col>
          <Col style={{alignContent: 'center'}}>
            <h1 style={{fontSize: '500%', margin: 0}}>Cart</h1>
          </Col>
        </Row>
        <Table tableLayout={"fixed"} rowSelection={{
          selectedRowKeys: rowSelectionState,
          onChange: (selectedRowKeys) => {
            console.log("selectedRowKeys changed: ", selectedRowKeys);
            setRowSelectionState(selectedRowKeys);
          }
        }}
               dataSource={dataSource}
               columns={columns}
               pagination={{pageSize: 9, hideOnSinglePage: true, defaultPageSize: 9, position: ['bottomCenter']}}
        />

      </Layout.Content>
      <Layout.Footer style={{padding: '0 10vw'}}>
        <Row justify={"space-between"} style={{width: '100%'}}>
          <Col>
            <Button size={"large"} type={'ghost'}>
              Remove All
            </Button>
          </Col>
          <Col>
            <Button size={"large"} type={'primary'}>
              Check Out
            </Button>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  );
}
