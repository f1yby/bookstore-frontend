import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Layout,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { BookData, BookService, WriterData } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { CartItemData, CartService, OrderData } from '@/service/CartService';

const RangePicker: any = DatePicker.RangePicker;

interface refWithFlipper {
  book: BookData;
}

interface CartItemWrapper {
  key: number;
  name: string;
  writers: string;
  price: number;
  count: number;
  ref: refWithFlipper;
}

const CartItemWrapperFromCartItem = (item: CartItemData): CartItemWrapper => {
  return {
    key: item.oiid,
    name: item.book.name,
    writers: item.book.writers,
    price: item.book.price,
    count: item.count,
    ref: {
      book: item.book,
    },
  };
};

interface OrderWrapper {
  key: number;
  orderItems: CartItemWrapper[];
}

const OrderWrapperFromOrder = (item: OrderData): OrderWrapper => {
  const items: CartItemWrapper[] = [];
  item.orderItems.forEach((value) =>
    items.push(CartItemWrapperFromCartItem(value)),
  );
  return {
    key: item.oid,
    orderItems: items,
  };
};
const ExpandableRender = (item: OrderWrapper) => {
  const buttons: JSX.Element[] = [];
  buttons.push(
    <Row>
      <Col offset={0} span={5}>
        BookName
      </Col>
      <Col offset={2} span={2}>
        Price Per.
      </Col>
      <Col offset={3} span={2}>
        Qty.
      </Col>
      <Col offset={5} span={5}>
        Price Sum
      </Col>
    </Row>,
  );
  item.orderItems.forEach((value) =>
    buttons.push(
      <Row>
        <Col offset={0} span={5}>
          <Button
            block
            onClick={() => PageSwitcher.jumpToDetailByBook(value.ref.book)}
          >
            {value.name}
          </Button>
        </Col>
        <Col offset={2} span={2}>
          <Typography.Text>
            {value.price}
            {'￥'}
          </Typography.Text>
        </Col>
        <Col offset={3} span={2}>
          <Typography.Text>
            {'x'}
            {value.count}
          </Typography.Text>
        </Col>
        <Col offset={5} span={5}>
          <Typography.Text>
            {(value.count * value.price).toFixed(2)}
            {'￥'}
          </Typography.Text>
        </Col>
      </Row>,
    ),
  );
  return buttons;
};

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'key',
  },
  {
    title: 'Amount',
    dataIndex: 'orderItems',
    render: (cart: CartItemWrapper[]) => {
      let count = 0;
      cart.forEach((value) => (count += value.count * value.price));
      return (
        <Row justify={'space-between'}>
          <Col>
            <Typography>{count.toFixed(2)}</Typography>
          </Col>
          <Col>
            <Typography>{'￥'}</Typography>
          </Col>
        </Row>
      );
    },
  },
];

export default () => {
  const [orderState, setOrderState] = useState<OrderData[]>();
  const [bookName, setBookName] = useState<string>();
  const [period, setPeriod] = useState<[string, string]>();

  useEffect(() => {
    CartService.findAll(setOrderState);
  }, []);
  const orderData: OrderWrapper[] = [];
  orderState?.forEach((item) => orderData.push(OrderWrapperFromOrder(item)));
  console.log(orderData);
  console.log(orderState);

  return (
    <Layout>
      <Layout.Content style={{ padding: '0 10vw', height: '80vh' }}>
        <Row
          align={'middle'}
          style={{ padding: '5vh 0 5vh' }}
          justify={'space-between'}
        >
          <Col>
            <RangePicker
              onChange={(dates: any, dateStrings: [string, string]) =>
                CartService.getAllByTimePeriod(dateStrings, setOrderState)
              }
            />
          </Col>
          <Col>
            <Input.Search
              onSearch={(text) =>
                CartService.getAllByBookName(text, setOrderState)
              }
            />
          </Col>
        </Row>
        <Table
          dataSource={orderData}
          columns={columns}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 5,
            position: ['bottomCenter'],
          }}
          scroll={{ x: '80vw', y: '80vh' }}
          expandable={{
            expandedRowRender: ExpandableRender,
          }}
        />
      </Layout.Content>
      <Layout.Footer style={{ padding: '0 10vw' }}></Layout.Footer>
    </Layout>
  );
};
