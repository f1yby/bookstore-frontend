import React from 'react';
import {Button, Col, Input, Layout, Row, Space, Table} from "antd";
import {ArrowRightOutlined, BookOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import './search.css';
import {history, useLocation} from "umi";

const {Footer, Content} = Layout;

const DefaultLayout = () => <Layout>
  <Content style={{padding: '25vh 30vh 35vh'}}>
    <Col style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
      <Space direction={"vertical"} align={'center'} size={100}>
        <BookOutlined style={{fontSize: '500%',}}/>
        <Input.Search enterButton size={"large"} style={{width: '600px'}}
                      onSearch={(key: string) => history.push({pathname: '/search', query: {keyword: key}})}/>
      </Space>
    </Col>
  </Content>
  <Footer/>
</Layout>;


const columns = [
  {
    title: 'Cover',
    dataIndex: 'coverSrc',
    render: (coverSrc: string) => <img src={coverSrc} alt={'book'} height={'80vh'}/>
  },
  {
    title: 'Book Name',
    dataIndex: 'bookName',
    render: (book: string) => <span
      style={{cursor: 'pointer'}}
      onClick={() => {
        history.push({pathname: '/search', query: {keyword: book}});
      }}>{book}</span>
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
    title: 'In Stock',
    dataIndex: 'count',
  },
  {
    title: 'Action',
    dataIndex: 'bId',
    render: (bId: number) => {
      return <Space>
        <Button type={'text'} onClick={() => {
        }}><ShoppingCartOutlined/> add to cart</Button>
        <Button type={'text'} onClick={() => {
        }}><ArrowRightOutlined/>buy</Button>
      </Space>
    }
  }
]
const dataSource = [
  {
    key: 0,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 1,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 2,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 3,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 4,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 5,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 6,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 7,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
    bookName: 'Book',
    writers: ['aaa', 'bbb'],
    price: 50,
    count: 1,
  }, {
    key: 8,
    coverSrc: 'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg',
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


export default () => {

  // @ts-ignore
  const {query} = useLocation();
  //console.log(query);
  const keywordFromQuery = (query != undefined) ? query['keyword'] : null;
  console.log(keywordFromQuery);
  if (keywordFromQuery == null || keywordFromQuery == '') {
    return <DefaultLayout/>;
  } else {
    return (
      <Layout>
        <Layout.Content style={{padding: '0 10vw 0'}}>
          <Row align={'middle'} style={{padding: '5vh 0 5vh'}} justify={"space-between"}>
            <Col>
              <Row align={'middle'}>
                <Col><BookOutlined color={'blue'} style={{fontSize: '300%'}}/></Col>
                <Col><h1 style={{fontSize: '300%', margin: 0}}>Result for "{keywordFromQuery}"</h1></Col>
              </Row>

            </Col>
            <Col style={{alignContent: 'center'}}>
              <Input.Search enterButton size={"large"} style={{width: '600px'}}
                            onSearch={(key: string) => history.push({pathname: '/search', query: {keyword: key}})}/>
            </Col>
          </Row>
          <Table tableLayout={"fixed"}
                 dataSource={dataSource}
                 columns={columns}
                 pagination={{pageSize: 5, hideOnSinglePage: true, defaultPageSize: 9, position: ['bottomCenter']}}
          />
        </Layout.Content>
      </Layout>);
  }

}
