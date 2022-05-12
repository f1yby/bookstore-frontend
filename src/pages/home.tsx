import React, {useEffect, useState} from 'react';
import {Card, Carousel, Col, Divider, Layout, Row} from 'antd';
import {BookService, BookData} from '@/service/BookService'
import {history} from "umi";
import PageSwitcher from "@/components/PageSwitcher";

const CardWrapper = (props: { book: BookData; }) => {
  const {book}: { book: BookData } = props;
  return <Card style={{width: '10vw', margin: '1px'}}
               cover={<img alt={book.bookName} src={book.coverSrc}/>}
               onClick={() => PageSwitcher.jumpToDetailByBook(book)}
               hoverable
  >
    <Card.Meta
      title={book.bookName}
      description={book.description.trim().slice(0, 21).concat('...')}
    />
  </Card>
}

const Cards = (props: { bookState: BookData[] }) => {

  const cols: any[] = [];
  props.bookState?.forEach(book => cols.push(<Col>
    <CardWrapper book={book}/>
  </Col>))
  return <Row justify={"center"}>
    {cols}
  </Row>;
}

const CarouselWrapper = (props: { bookState: BookData[] }) => {
  console.log(props.bookState);
  const items: JSX.Element[] = [];
  props.bookState?.slice(1, 5).forEach(item => items.push(<CarouselItemWrapper book={item}/>))
  // if (props.bookState) {
  //   items.push(<CarouselItemWrapper book={props.bookState[0]}/>);
  // }
  return <>
    <Carousel autoplay style={{width: '60vw'}} dots={false}>
      {items}
    </Carousel>

  </>

}


const CarouselItemWrapper = (props: { book: BookData }) => {
  return <Row style={{width: '60vw'}} justify={'center'}>
    <Col style={{width: '20vw'}}>
      <img src={props.book.coverSrc} alt={'book'} width={'100%'}
           onClick={() => PageSwitcher.jumpToDetailByBook(props.book)} style={{cursor: 'pointer'}}/>
    </Col>
    <Col style={{width: '20vw'}}>
      <span style={{fontSize: '130%', fontStyle: 'italic'}}>
        {props.book.description}
      </span>
    </Col>
  </Row>
}


export default () => {
  const [bookState, setBookState] = useState<BookData[]>();
  useEffect(() => {
    BookService.getBooks(setBookState);
  }, []);
  if (bookState) {
    return (
      <Layout>
        <Layout.Content style={{padding: '10vh 10vw'}}>
          <Row justify={"center"}>
            <Col>
              <CarouselWrapper bookState={bookState}/>
            </Col>
          </Row>
          <Divider/>
          <Cards bookState={bookState}/>
        </Layout.Content>
      </Layout>
    );
  } else {
    return <></>
  }

}
