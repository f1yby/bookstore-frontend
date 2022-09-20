import React, { Component, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Input,
  Layout,
  Row,
  Space,
  Table,
  Typography,
  DatePicker,
} from 'antd';
import {
  ArrowRightOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { history, useLocation } from 'umi';
import {
  BookData,
  BookDataWithSell,
  BookService,
  WriterData,
} from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { CartService } from '@/service/CartService';
import * as dayjs from 'dayjs';
import BookSellForm, { DefaultColumns } from '@/components/BookSellForm';

// const {Footer, Content} = Layout;
// //TODO ANTD is broken
// const RangePicker: any = DatePicker.RangePicker;
//
// interface BookDataExtendedWithRef extends BookData {
//   ref: BookData;
//   sell: number;
// }

const columns = [
  {
    title: 'Cover',
    dataIndex: 'ref',
    render: (book: BookData) => (
      <img
        src={book.image}
        alt={'book'}
        height={'80vh'}
        onClick={() => PageSwitcher.jumpToEditByBook(book)}
        style={{ cursor: 'pointer' }}
      />
    ),
  },
  {
    title: 'Book Name',
    dataIndex: 'name',
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
    title: 'Writer',
    dataIndex: 'writers',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a: { price: number }, b: { price: number }) => a.price - b.price,
    render: (price: { toString: () => string | any[] }) => (
      <Typography.Text>
        {price.toString()}
        {'￥'}
      </Typography.Text>
    ),
  },
  {
    title: 'Sell',
    dataIndex: 'sell',
    sorter: (a: { sell: number }, b: { sell: number }) => a.sell - b.sell,
    render: (sell: { toString: () => string | any[] }) => (
      <Typography.Text>{sell.toString()}</Typography.Text>
    ),
  },
  {
    title: 'In Stock',
    dataIndex: 'inventory',
  },
  {
    title: 'Action',
    dataIndex: 'ref',
    render: (book: BookData) => {
      return (
        <Space>
          <Button
            type={'text'}
            onClick={() => PageSwitcher.jumpToEditByBook(book)}
            style={{ cursor: 'pointer' }}
          >
            {' '}
            Edit
          </Button>
        </Space>
      );
    },
  },
];

export default () => {
  // const [bookState, setBookState] = useState<BookDataWithSell[]>();
  // useEffect(() => {
  //   BookService.getBookWithSells(setBookState);
  //   console.log(bookState);
  // }, []);
  //
  // const bookWithPicture: BookDataExtendedWithRef[] = [];
  // bookState?.forEach(book => bookWithPicture.push({
  //   isbn: book.isbn,
  //   type: book.type,
  //   bid: book.bid,
  //   inventory: book.inventory,
  //   image: book.image,
  //   description: book.description,
  //   ref: book,
  //   price: book.price,
  //   writers: book.writers,
  //   name: book.name,
  //   sell: book.sell,
  //   activated: book.activated
  // }))
  //
  // return (
  //   <Layout>
  //     <Layout.Content style={{padding: '0 10vw 0'}}>
  //       <Row align={'middle'} style={{padding: '5vh 0 5vh'}} justify={"space-between"}>
  //         <Col style={{alignContent: 'center'}}>
  //           <RangePicker
  //             onChange={(dates: any, dateStrings: [string, string]) => BookService.getBookWithSellsByTimePeriod(dateStrings, setBookState)}/>
  //         </Col>
  //       </Row>
  //       <Table tableLayout={"auto"}
  //              dataSource={bookWithPicture}
  //              columns={columns}
  //              pagination={{hideOnSinglePage: true, defaultPageSize: 9, position: ['bottomCenter']}}
  //       />
  //     </Layout.Content>
  //   </Layout>);

  return (
    <BookSellForm
      setInitialState={BookService.getBookWithSells}
      setUpdateState={BookService.getBookWithSellsByTimePeriod}
      columns={columns}
    />
  );
};
