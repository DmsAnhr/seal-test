import React, { useEffect, useState } from 'react';
import { getNewscategory, getPopularNews, getRecomNews } from '../services/Api';
import { Carousel, Container, Button, Row, Col, Card, Badge, Pagination, Form} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import slide from '../assets/images/slide.png';

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [recom, setRecom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const newsPerPage = 8;
  const [imageIndex, setImageIndex] = useState(0);

  const removeBaseUrl = (url) => {
    const baseUrl = 'https://www.cnnindonesia.com/';
    const raw = url.replace(baseUrl, '')
    
    return encodeURIComponent(raw);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getNewscategory('terbaru');
        const sortedPosts = data
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .slice(0, 5);
        setSlides(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the latest news:', error);
        setLoading(false);
      }
    };

    const fetchPopularNews = async () => {
      try {
        const data = await getPopularNews();
        setPopularNews(data);
      } catch (error) {
        console.error('Error fetching related news:', error);
      }
    };

    const fetchNewsRecom = async () => {
      const recomNews = await getRecomNews();
      setRecom(recomNews);
    };

    fetchSlides();
    fetchPopularNews();
    fetchNewsRecom();
  }, []);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleImageSelect = (selectedIndex) => {
    setImageIndex(selectedIndex);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNews = recom.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const images = [slide, slide, slide];

  if (loading) {
    return (
      <Container>
        <Carousel activeIndex={currentIndex} onSelect={handleSelect} controls={false} indicators={false}>
            <Carousel.Item>
              <div className="d-flex justify-content-between align-items-center">
                <div className='pe-0 pe-md-5'>
                  <Skeleton height={40} width={200} className="d-block bg-light mb-4" />
                  <Skeleton height={20} count={3} className="d-block bg-light my-2" />
                </div>
                <div>
                  <Skeleton height={295} width={600} className='d-block bg-light' />
                </div>
              </div>
            </Carousel.Item>
        </Carousel>
      </Container>
    );
  }

  return (
    <Container className='pt-5'>
      <Carousel activeIndex={currentIndex} onSelect={handleSelect} controls={false} indicators={false}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div className='pe-0 pe-md-5'>
                <h6 className="mb-4 text-secondary">Headline</h6>
                <h3>{slide.title}</h3>
                <p className='text-secondary'>{slide.description}</p>
                <span className='text-secondary'><i className="bi bi-calendar-event me-2"></i>{formatDate(slide.pubDate)}</span> <br/>
                <a 
                  href={`/news/${slide.category}/${removeBaseUrl(slide.link)}`}
                  className='text-decoration-none'
                >
                  Baca Selengkapnya <i className="bi bi-arrow-up-right ms-2"></i>
                </a>
              </div>
              <div>
                <img
                  src={slide.thumbnail}
                  alt=""
                  className="d-block w-100 rounded-3"
                  style={{ maxHeight: '417px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex justify-content-center align-items-center my-4">
        <Button
          variant="ts" className='text-secondary'
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1))}
        >
          <i className="bi bi-chevron-left me-2"></i>
          {currentIndex + 1}
        </Button>
        <span className="mx-2 text-secondary"> dari </span>
        <Button
          variant="ts" className='text-secondary'
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0))}
        >
          {slides.length}
          <i className="bi bi-chevron-right ms-2"></i>
        </Button>
      </div>
      <Row className="py-5 my-5">
        <Col className='col-12'>
          <h4 className='news-head-title mb-5'>Berita Terpopuler</h4>
        </Col>
        {popularNews.map((newsItem, index) => (
          <Col key={index} as="a" href={`/news/${newsItem.category}/${removeBaseUrl(newsItem.link)}`} className='col-4-news'>
            <Card className='flex-row rounded-0 border-0 border-end'>
              <h5 style={{ marginTop: "-14px", marginRight: "-20px", zIndex: "99" }}>
                <Badge bg="dark" className='rounded-pill'>{index + 1}</Badge>
              </h5>
              <Card.Img
                alt=""
                src={newsItem.thumbnail}
                style={{ aspectRatio: "6/5", objectFit: "cover", maxHeight: "137px" }}
              />
              <Card.Body className='py-0 d-flex flex-column justify-content-between'>
                <Card.Title style={{fontSize:"1vw"}}>{newsItem.title}</Card.Title>
                <h6 style={{fontSize:"0.9vw"}}>
                  <span className='text-primary text-capitalize'>{newsItem.category}</span>
                  <i className="bi bi-dot text-muted"></i>
                  <span className='text-secondary'>{formatDate(newsItem.pubDate)}</span>
                </h6>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Row className="py-5 my-5">
        <Col className='col-12 d-flex justify-content-between align-items-center mb-5'>
          <h4 className='news-head-title mb-0'>Rekomendasi Untuk Anda</h4>
          <div style={{width:"30%"}}>
            <Form.Control type="search" placeholder="Cari disini..." />
          </div>
        </Col>
        <Col sm={3}>
          <Card className='rounded-0 border-0'>
            <Card.Img alt="" src="https://akcdn.detik.net.id/visual/2024/07/29/olympics-2024-shooting_169.jpeg?w=360&q=90" style={{aspectRatio:"5/",objectFit:"cover",maxHeight:"277px"}} />
            <Card.Body className='px-1'>
              <Card.Title className='fs-6'>Klasemen Medali Emas ASEAN Sepanjang Sejarah Olimpiade</Card.Title>
              <h6 className='mt-4'><span className='text-primary'>Politik</span><i className="bi bi-dot text-muted"></i><span className='text-secondary'>29 Juli 2024</span></h6>
            </Card.Body>
          </Card>
        </Col>
        <Col className='col-12 mt-5 d-flex justify-content-between align-items-center'>
          <h6 className='fs-7 m-0'>Showing 1 to 18 of 97 result</h6>
          <Pagination className='m-0'>
            <Pagination.Prev><i className="bi bi-arrow-left-short fs-6 me-1"></i>Previous</Pagination.Prev>
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            
            <Pagination.Ellipsis />
            
            <Pagination.Item>{8}</Pagination.Item>
            <Pagination.Item>{9}</Pagination.Item>
            <Pagination.Next>Next<i className="bi bi-arrow-right-short fs-6 ms-1"></i></Pagination.Next>
          </Pagination>
        </Col>
      </Row> */}
      <Row className="py-5 my-5">
        <Col className='col-12 d-flex justify-content-between align-items-center mb-5'>
          <h4 className='news-head-title mb-0'>Rekomendasi Untuk Anda</h4>
          <div style={{ width: "30%" }}>
            <Form.Control type="search" placeholder="Cari disini..." value={searchQuery} onChange={handleSearch} />
          </div>
        </Col>
        {currentNews.map((item, index) => (
          <Col as="a" href={`/news/${item.category}/${removeBaseUrl(item.link)}`} sm={3} key={index} className='mb-0 mb-sm-5 col-3-news'>
            <Card className='rounded-0 border-0'>
              <Card.Img alt="" src={item.thumbnail} style={{ aspectRatio: "5/4", objectFit: "cover", maxHeight: "277px" }} />
              <Card.Body className='px-1'>
                <Card.Title className='fs-6 clamp-3 mb-0'>{item.title}</Card.Title>
                {/* <a href={`/news/${item.category}/${item.link}`} className='text-decoration-none'>
                  Baca Selengkapnya <i className="bi bi-arrow-up-right ms-2"></i>
                </a> */}
              </Card.Body>
            </Card>
            <h6 className='px-1'>
              <span className='text-primary text-capitalize'>{item.category}</span>
              <i className="bi bi-dot text-muted"></i>
              <span className='text-secondary'>{formatDate(item.pubDate)}</span>
            </h6>
          </Col>
        ))}
        <Col className='col-12 mt-5 d-flex justify-content-between align-items-center'>
          <h6 className='fs-7 m-0'>Showing {indexOfFirstNews + 1} to {indexOfLastNews} of {filteredNews.length} results</h6>
          <Pagination className='m-0'>
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
              <i className="bi bi-arrow-left-short fs-6 me-1"></i>Previous
            </Pagination.Prev>
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
              Next<i className="bi bi-arrow-right-short fs-6 ms-1"></i>
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
      <Carousel activeIndex={imageIndex} onSelect={handleImageSelect} className="my-4" controls={false} indicators={false}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image}
              alt=""
              className="d-block w-100"
              style={{ maxHeight: '417px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex justify-content-center align-items-center pb-5">
        {images.map((_, index) => (
          <i
            key={index}
            className={`bi bi-circle-fill mx-1 ${index === imageIndex ? 'text-primary' : 'text-secondary'}`}
            onClick={() => handleImageSelect(index)}
            style={{ cursor: 'pointer', fontSize:'8px'}}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
