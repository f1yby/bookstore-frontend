import React from 'react';
import styles from './login.css';
import {Layout, Form, Input, Checkbox, Button, Row, Col, Divider} from "antd";
import {BookOutlined} from "@ant-design/icons";

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Layout.Content style={{margin: '20vh 30vw'}}>
        <Row justify={"center"}>
          <Col>
            <BookOutlined style={{fontSize: '500%'}}/>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col style={{width: '100%'}}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 16,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button type="primary" block>
                  Login
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button type='default' block>
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

      </Layout.Content>
    </Layout>

  );
}
