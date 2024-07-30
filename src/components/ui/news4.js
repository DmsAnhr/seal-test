import React from 'react';
import { Card, Col } from 'react-bootstrap';

const news4 = ({ newsItem, index }) => {

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
    <Col as="a" href={`/news/${newsItem.category}/${removeBaseUrl(newsItem.link)}`} sm={4} key={index} className='mb-0 mb-sm-5 col-4-news'>
        <Card className='rounded-0 border-0'>
            <Card.Img alt="" src={newsItem.thumbnail} style={{ aspectRatio: "5/4", objectFit: "cover", maxHeight: "277px" }} />
            <Card.Body className='px-1'>
                <Card.Title className='fs-6 clamp-3 mb-0'>{newsItem.title}</Card.Title>
            </Card.Body>
        </Card>
        <h6 className='px-1'>
            <span className='text-primary text-capitalize'>{newsItem.category}</span>
            <i className="bi bi-dot text-muted"></i>
            <span className='text-muted'>{formatDate(newsItem.pubDate)}</span>
        </h6>
    </Col>
  );
};

export default news4;
