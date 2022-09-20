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
import { BookData, BookService, WriterData } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { CartService } from '@/service/CartService';
import * as dayjs from 'dayjs';

const { Footer, Content } = Layout;
//TODO ANTD is broken
const RangePicker: any = DatePicker.RangePicker;

interface BookDataExtendedWithRef extends BookData {
  ref: BookData;
}

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
    title: 'In Stock',
    dataIndex: 'inventory',
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn',
  },
  {
    title: 'Activated',
    dataIndex: 'ref',
    render: (book: BookData) => {
      return book.activated ? 'true' : 'false';
    },
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
            Edit
          </Button>
        </Space>
      );
    },
  },
];

export default () => {
  // @ts-ignore
  const { query } = useLocation();
  console.log(query);
  const keywordFromQuery = query != undefined ? query['keyword'] : null;
  const [bookState, setBookState] = useState<BookData[]>();
  if (keywordFromQuery == null || keywordFromQuery == '') {
    useEffect(() => {
      BookService.getBooks(setBookState);
      console.log(bookState);
    }, [query]);
  } else {
    useEffect(() => {
      BookService.getBookByKeyword(keywordFromQuery, setBookState);
      console.log(bookState);
    }, [query]);
  }
  const bookWithPicture: BookDataExtendedWithRef[] = [];
  bookState?.forEach((book) =>
    bookWithPicture.push({
      isbn: book.isbn,
      type: book.type,
      bid: book.bid,
      inventory: book.inventory,
      image: book.image,
      description: book.description,
      ref: book,
      price: book.price,
      writers: book.writers,
      name: book.name,
      activated: book.activated,
    }),
  );
  console.log(bookWithPicture);

  return (
    <Layout>
      <Layout.Content style={{ padding: '0 10vw 0' }}>
        <Row
          align={'middle'}
          style={{ padding: '5vh 0 5vh' }}
          justify={'space-between'}
        >
          <Col>
            <Row align={'middle'}>
              <Col>
                <BookOutlined color={'blue'} style={{ fontSize: '300%' }} />
              </Col>
              <Col>
                <h1 style={{ fontSize: '300%', margin: 0 }}>
                  Result for "{keywordFromQuery}"
                </h1>
              </Col>
            </Row>
          </Col>
          <Col style={{ alignContent: 'center' }}>
            <RangePicker
              showTime
              onChange={(dates: any, dateStrings: [string, string]) =>
                console.log(dateStrings)
              }
            />
          </Col>
          <Col style={{ alignContent: 'center' }}>
            <Input.Search
              enterButton
              size={'large'}
              style={{ width: '600px' }}
              onSearch={(key: string) =>
                PageSwitcher.jumpToSearchByKeyword(key)
              }
            />
          </Col>
        </Row>
        <Table
          tableLayout={'auto'}
          dataSource={bookWithPicture}
          columns={columns}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 9,
            position: ['bottomCenter'],
          }}
        />
      </Layout.Content>
    </Layout>
  );
};
