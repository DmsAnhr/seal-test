import React from 'react';
import { Card, Col} from 'react-bootstrap';

const news1 = ({ newsItem, index }) => {

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
    <Col key={index} as="a" href={`/news/${newsItem.category}/${removeBaseUrl(newsItem.link)}`} className='col-1-news'>
      <Card className='rounded-0 border-0 w-100 mb-4'>
        <Card.Body className='py-0 d-flex px-0 px-md-3'>
          <Card.Img
            alt=""
            src={newsItem.thumbnail}
            style={{objectFit: "cover", width:"35%", height: "137px" }}
          />
          <div className=' d-flex flex-column justify-content-center ps-3' style={{width:'65%'}}>
            <Card.Title style={{fontSize:"20px"}}>
              {newsItem.title}
              </Card.Title>
            <h6 style={{fontSize:"14px"}} className='mt-2'>
              <span className='text-primary text-capitalize'>{newsItem.category}</span>
              <i className="bi bi-dot text-muted"></i>
              <span className='text-secondary'>{formatDate(newsItem.pubDate)}</span>
            </h6>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default news1;
