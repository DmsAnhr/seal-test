import React from 'react';
import { Card, Col, Badge } from 'react-bootstrap';

const news12 = ({ newsItem, index }) => {

    const removeBaseUrl = (url) => {
        const baseUrl = 'https://www.cnnindonesia.com/';
        const raw = url.replace(baseUrl, '')
        
        return encodeURIComponent(raw);
    };
  
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

  return (
    <Col key={index} as="a" href={`/news/${newsItem.category}/${removeBaseUrl(newsItem.link)}`} className='col-4-news col-12 mb-4'>
      <Card className='flex-row rounded-0 border-0 border-bottom pb-4'>
        <h5 style={{ marginTop: "-14px", marginRight: "-20px", zIndex: "99" }}>
          <Badge bg="dark" className='rounded-pill'>{index + 1}</Badge>
        </h5>
        <Card.Img
          alt=""
          src={newsItem.thumbnail}
          style={{ aspectRatio: "6/5", objectFit: "cover", width: "100px" }}
        />
        <Card.Body className='py-0 d-flex flex-column justify-content-between'>
          <Card.Title style={{ fontSize: "1vw" }} className='clamp-3'>{newsItem.title}</Card.Title>
          <h6 style={{ fontSize: "0.9vw" }}>
            <span className='text-primary text-capitalize'>{newsItem.category}</span>
            <i className="bi bi-dot text-muted"></i>
            <span className='text-secondary'>{formatDate(newsItem.pubDate)}</span>
          </h6>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default news12;
