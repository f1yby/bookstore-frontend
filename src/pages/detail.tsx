import React from 'react';
import styles from './detail.css';
import {Layout, Row, Col, Divider, Typography, Button} from "antd";
import {history} from "umi";
import {BookData, WriterData} from "@/service/BookService";
import PageSwitcher from "@/components/PageSwitcher";


const WritersWrapper = (props: { writers: WriterData[]; }) => {
  let buttons: JSX.Element[] = [];
  props.writers.forEach((writer) => buttons.push(
    <Col>
      <Button type={"text"}
              onClick={() => PageSwitcher.jumpToSearchByKeyword(writer.name)}>{writer.name}</Button>{/*TODO getByWriter*/}
    </Col>
  ));
  return <>{buttons}</>;
}
export default () => {
  const {query} = history.location;

  // @ts-ignore
  const bookJSON: string = query.book;
  const book: BookData = JSON.parse(bookJSON);
  if (typeof book === 'undefined') {
    history.goBack();
    return <></>;
  }

  return (
    <Layout>
      <Layout.Footer/>
      <Layout.Content style={{margin: '0 10vw'}}>
        <Row justify={"center"} align={'stretch'}>
          <Col style={{width: '20vw'}}>
            <img src={book.coverSrc} style={{width: '100%'}} alt={book.bookName}/>
          </Col>
          <Col style={{width: '30vw', margin: '0 5vw 0'}}>
            <Row justify={"center"}>
              <Col>
                <Typography.Title>
                  {book.bookName}
                </Typography.Title>
              </Col>
            </Row>
            <Divider/>
            <Row align={'middle'}>
              <Col>
                <Typography.Text strong>
                  Writers:
                </Typography.Text>
              </Col>
              <WritersWrapper writers={book.writers}/>
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
        <Divider/>
      </Layout.Content>
    </Layout>
  );
}
