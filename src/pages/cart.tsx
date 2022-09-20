import React, { useEffect, useState } from 'react';
import { Button, Col, Layout, Row, Space, Table, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { BookData, WriterData } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { CartItemData, CartService } from '@/service/CartService';

interface refWithFlipper {
  book: BookData;
  flipper: () => void;
}

interface CartItemWrapper {
  key: number;
  name: string;
  writers: string;
  price: number;
  count: number;
  ref: refWithFlipper;
}

const CartItemWrapperFromCartItem = (
  item: CartItemData,
  flipper: () => void,
): CartItemWrapper => {
  return {
    key: item.oiid,
    name: item.book.name,
    writers: item.book.writers,
    price: item.book.price,
    count: item.count,
    ref: {
      book: item.book,
      flipper: flipper,
    },
  };
};

let flipper: boolean = false;
const columns = [
  {
    title: 'Cover',
    dataIndex: 'ref',
    render: (book: refWithFlipper) => (
      <img
        src={book.book.image}
        alt={'book'}
        height={'80vh'}
        onClick={() => PageSwitcher.jumpToDetailByBook(book.book)}
        style={{ cursor: 'pointer' }}
      />
    ),
  },
  {
    title: 'Book',
    dataIndex: 'name',
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
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Action',
    dataIndex: 'ref',
    render: (book: refWithFlipper) => {
      return (
        <Space>
          <Button
            type={'text'}
            onClick={() => {
              CartService.addToCart(book.book.bid);
              book.flipper();
            }}
          >
            add
          </Button>
          <Button
            type={'text'}
            onClick={() => {
              CartService.removeFromCart(book.book.bid);
              book.flipper();
            }}
          >
            remove
          </Button>
        </Space>
      );
    },
  },
];

export default () => {
  const [rowSelectionState, setRowSelectionState] = useState<React.Key[]>();
  const [cartDataItemState, setCartDataItemState] = useState<CartItemData[]>();
  const [flipperState, setFlipperState] = useState<boolean>();
  const flipper = () => {
    setFlipperState(!flipperState);
  };
  useEffect(() => CartService.getCart(setCartDataItemState), [flipperState]);

  const cartData: CartItemWrapper[] = [];
  cartDataItemState?.forEach((item) =>
    cartData.push(CartItemWrapperFromCartItem(item, flipper)),
  );
  console.log(cartData);
  console.log(cartDataItemState);

  console.log(rowSelectionState);
  return (
    <Layout>
      <Layout.Content style={{ padding: '0 10vw', height: '80vh' }}>
        <Row align={'middle'}>
          <Col>
            <ShoppingCartOutlined style={{ fontSize: '500%' }} />
          </Col>
          <Col style={{ alignContent: 'center' }}>
            <h1 style={{ fontSize: '500%', margin: 0 }}>Cart</h1>
          </Col>
          <Col offset={15} span={4}>
            <Button
              size={'large'}
              type={'primary'}
              onClick={() => {
                const oiid: number[] = [];
                if (rowSelectionState?.length != 0) {
                  if (cartDataItemState) {
                    rowSelectionState?.forEach((index) =>
                      cartDataItemState.forEach((item) =>
                        item.oiid == index ? oiid.push(item.oiid) : null,
                      ),
                    );
                    console.log(oiid);
                    CartService.checkOut(oiid);
                    history.push({ pathname: '/order' });
                  }
                }
              }}
            >
              Check Out
            </Button>
          </Col>
        </Row>
        <Table
          tableLayout={'fixed'}
          rowSelection={{
            selectedRowKeys: rowSelectionState,
            onChange: (selectedRowKeys) => {
              console.log('selectedRowKeys changed: ', selectedRowKeys);
              setRowSelectionState(selectedRowKeys);
            },
          }}
          dataSource={cartData}
          columns={columns}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 5,
            position: ['bottomCenter'],
          }}
          scroll={{ x: '80vw', y: '80vh' }}
        />
      </Layout.Content>
      <Layout.Footer style={{ padding: '0 10vw' }}></Layout.Footer>
    </Layout>
  );
};
