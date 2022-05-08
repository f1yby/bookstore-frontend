import React from 'react';
import {Card, Carousel, Col, Divider, Layout, Row} from 'antd';

const CardWrapper = (props: { bookName: string | undefined; bookSrc: string | undefined; bookId: number; bookDescription: string | undefined }) => {
  return <Card style={{width: '10vw', border: 0}}
               cover={<img alt={props.bookName} src={props.bookSrc}/>}
               onClick={() => alert(props.bookId)}
               hoverable
  >
    <Card.Meta
      title={props.bookName}
      description={props.bookDescription}
    />
  </Card>
}
const CarouselItemWrapper = () => {
  return <Row style={{width: '60vw'}} justify={'center'}>
    <Col style={{width: '20vw'}}>
      <img src={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} alt={'oo'}/>
    </Col>
    <Col style={{width: '20vw'}}>
      <span style={{fontSize: '130%', fontStyle: 'italic'}}>
        {'内斗就要亡国，亡国也要内斗！从南明的灭亡，看透人性的荒唐！荣获中国国家图书奖，北京市哲学社会科学优秀成果一等奖。明史大家顾诚代表作，豆瓣9.3分，不可不读的史学经典，读客熊猫君出品 '}
      </span>
    </Col>
  </Row>
}
export default function Page() {
  return (
    <Layout>
      <Layout.Content style={{padding: '10vh 10vw'}}>
        <Row justify={"center"}>
          <Col>
            <Carousel autoplay style={{width: '60vw'}} dots={false}>
              <CarouselItemWrapper/>
              <CarouselItemWrapper/>
            </Carousel>
          </Col>
        </Row>
        <Divider/>
        <Row justify={"center"}>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/> </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
          <Col>
            <CardWrapper bookName={'sa'} bookSrc={'https://img3m4.ddimg.cn/51/24/29383944-1_w_3.jpg'} bookId={123}
                         bookDescription={'北岛 著，理想国 出'}/>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
