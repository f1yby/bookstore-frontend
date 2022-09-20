import {
  Button,
  Col,
  DatePicker,
  Layout,
  Row,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from 'antd';
import { BookData, BookDataWithSell, BookService } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { history } from '@@/core/history';
import React, { useEffect, useState } from 'react';

const { Footer, Content } = Layout;
//TODO ANTD is broken
const RangePicker: any = DatePicker.RangePicker;

interface BookDataExtendedWithRef extends BookData {
  ref: BookData;
  sell: number;
}

export const DefaultColumns = [
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
];

// export default (initialStateSetter: ((arg0: BookDataWithSell) => void), updatePicker: (period: [string, string], callback: (arg0: BookDataWithSell[]) => void) => void) => {
export default (props: {
  setInitialState: (
    arg0: React.Dispatch<React.SetStateAction<BookDataWithSell[] | undefined>>,
  ) => void;
  setUpdateState: (
    arg0: [string, string],
    arg1: React.Dispatch<React.SetStateAction<BookDataWithSell[] | undefined>>,
  ) => any;
  columns: TableColumnsType<BookDataExtendedWithRef> | undefined;
}) => {
  const [bookState, setBookState] = useState<BookDataWithSell[]>();
  useEffect(() => {
    props.setInitialState(setBookState);
    console.log(bookState);
  }, []);

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
      sell: book.sell,
      activated: book.activated,
    }),
  );

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
                props.setUpdateState(dateStrings, setBookState)
              }
            />
          </Col>
        </Row>
        <Table
          tableLayout={'auto'}
          dataSource={bookWithPicture}
          columns={props.columns}
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
