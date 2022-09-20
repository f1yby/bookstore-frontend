import React from 'react';
import styles from './login.css';
import { Layout, Form, Input, Checkbox, Button, Row, Col, Divider } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { SignData, UserService } from '@/service/UserService';

interface SignUpData extends SignData {
  passwordConfirm: string;
  email: string;
}

const handleEmail = (email: string) => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email,
    )
  ) {
    alert('请输入正确的Email');
  }
};

export default () => {
  const onFinish = (values: SignUpData) => {
    console.log(values);
    if (values.passwordConfirm != values.password) {
      alert('两次密码不一致');
    }
    if (
      values.passwordConfirm != values.password &&
      handleEmail(values.email)
    ) {
      return;
    }
    UserService.Signup(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Layout.Content style={{ margin: '20vh 30vw' }}>
        <Row justify={'center'}>
          <Col>
            <BookOutlined style={{ fontSize: '500%' }} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col style={{ width: '100%' }}>
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
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email',
                  },
                ]}
              >
                <Input />
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
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: 'Please re-input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
