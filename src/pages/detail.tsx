import React from 'react';
import styles from './detail.css';
import { Layout, Row, Col, Divider, Typography, Button } from 'antd';
import { history } from 'umi';
import { BookData, WriterData } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import { RollbackOutlined } from '@ant-design/icons';
import { CartService } from '@/service/CartService';

// const WritersWrapper = (props: { writers: WriterData[]; }) => {
//   let buttons: JSX.Element[] = [];
//   props.writers.forEach((writer) => buttons.push(
//     <Col>
//       <Button type={"text"}
//               onClick={() => PageSwitcher.jumpToSearchByKeyword(writer.name)}>{writer.name}</Button>{/*TODO getByWriter*/}
//     </Col>
//   ));
//   return <>{buttons}</>;
// }
const WritersWrapper = (props: { writers: string }) => {
  return <Typography.Text>{props.writers}</Typography.Text>;
};

export default () => {
  const { query } = history.location;

  // @ts-ignore
  const bookJSON: string = query.book;
  const book: BookData = JSON.parse(bookJSON);
  if (typeof book === 'undefined') {
    history.goBack();
    return <></>;
  }

  return (
    <Layout>
      <Layout.Footer></Layout.Footer>
      <Layout.Content style={{ margin: '0 10vw' }}>
        <Row>
          <Col onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
            <RollbackOutlined
              color={'blue'}
              style={{ color: 'grey', fontSize: '300%' }}
            />
            <Typography.Text
              strong
              style={{
                color: 'grey',
                fontSize: '300%',
              }}
            >
              Back
            </Typography.Text>
          </Col>
        </Row>
        <Row justify={'center'} align={'stretch'}>
          <Col style={{ width: '20vw' }}>
            <img src={book.image} style={{ width: '100%' }} alt={book.name} />
          </Col>
          <Col style={{ width: '30vw', margin: '0 5vw 0' }}>
            <Row justify={'center'}>
              <Col>
                <Typography.Title>{book.name}</Typography.Title>
              </Col>
            </Row>
            <Divider />
            <Row align={'middle'}>
              <Col>
                <Typography.Text strong style={{ margin: '0 10px 0' }}>
                  Writer:
                </Typography.Text>
              </Col>
              <WritersWrapper writers={book.writers} />
            </Row>
            <Row>
              <Col>
                <Typography.Text italic type={'secondary'}>
                  {book.description}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col offset={10} span={10}>
            <Button
              type={'primary'}
              block
              onClick={() => CartService.addToCart(book.bid)}
            >
              <Typography.Text strong style={{ color: 'yellow' }}>
                {book.price}￥{' '}
              </Typography.Text>{' '}
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
