import React, { useState } from 'react';
import styles from './detail.css';
import {
  Layout,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';
import { history } from 'umi';
import { BookData, BookService, WriterData } from '@/service/BookService';
import PageSwitcher from '@/components/PageSwitcher';
import Book from '@/pages/manage/book';
import { CartItemData } from '@/service/CartService';

interface FormData extends BookData {
  addNew: boolean;
}

const FormDataFromBookData = (book: BookData): FormData => {
  return {
    bid: book.bid,
    description: book.description,
    image: book.image,
    inventory: book.inventory,
    isbn: book.isbn,
    price: book.price,
    type: book.type,
    writers: book.writers,
    name: book.name,
    addNew: false,
    activated: book.activated,
  };
};
export default () => {
  const { query } = history.location;

  // @ts-ignore
  const bookJSON: string = query.book;
  const book: BookData = JSON.parse(bookJSON);

  console.log(book);
  if (typeof book === 'undefined') {
    history.goBack();
    return <></>;
  }

  return (
    <Layout>
      <Layout.Footer />
      <Layout.Content style={{ margin: '0 10vw' }}>
        <Row justify={'center'} align={'stretch'}>
          <Col style={{ width: '20vw' }}>
            <img src={book.image} style={{ width: '100%' }} alt={book.name} />
          </Col>
          <Col style={{ width: '30vw', margin: '0 5vw 0' }}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={FormDataFromBookData(book)}
              onFinish={(values) => {
                if (values.addNew) {
                  BookService.add(values);
                } else {
                  values.bid = book.bid;
                  BookService.update(values);
                }
              }}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input book name',
                  },
                ]}
                // initialValue={book.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ISBN"
                name="isbn"
                rules={[
                  {
                    required: true,
                    message: 'Please input book isbn',
                  },
                ]}
                // initialValue={book.isbn}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please input book type',
                  },
                ]}
                // initialValue={book.type}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Writers"
                name="writers"
                rules={[
                  {
                    required: true,
                    message: 'Writers',
                  },
                ]}
                // initialValue={book.writers}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Inventory"
                name="inventory"
                rules={[
                  {
                    required: true,
                    message: 'Book Inventory',
                  },
                ]}
                // initialValue={book.inventory}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Price',
                  },
                ]}
                // initialValue={book.price}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Image Url"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Book Cover',
                  },
                ]}
                // initialValue={book.image}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Book Description',
                  },
                ]}
                // initialValue={book.description}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="Activated"
                name="activated"
                valuePropName="checked"
                // initialValue={book.activated}
              >
                <Checkbox />
              </Form.Item>

              <Form.Item
                label="Update as New Book"
                name="addNew"
                valuePropName="checked"
                // initialValue={book.activated}
              >
                <Checkbox />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Divider />
      </Layout.Content>
    </Layout>
  );
};
