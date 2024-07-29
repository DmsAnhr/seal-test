import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestNews, getAllNews } from '../services/Api';
import { Carousel, Container, Button, Row, Col, Card, Badge, Pagination} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import slide from '../assets/images/slide.png';

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [news, setNews] = useState([]);

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
        const data = await getLatestNews(); // Tidak ada .data.posts
        const sortedPosts = data
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)) // Sortir berdasarkan pubDate
          .slice(0, 5); // Ambil 5 data terbaru
        setSlides(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the latest news:', error);
        setLoading(false);
      }
    };

    const fetchAndSetNews = async () => {
      const allPosts = await getAllNews();
      if (allPosts.length > 0) {
        allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        const uniqueLinks = new Set();
        const randomPosts = [];
        
        const topPosts = allPosts.slice(0, 8);
        
        while (randomPosts.length < 3 && topPosts.length > 0) {
          const randomIndex = Math.floor(Math.random() * topPosts.length);
          const selectedPost = topPosts[randomIndex];
          
          if (!uniqueLinks.has(selectedPost.link)) {
            randomPosts.push(selectedPost);
            uniqueLinks.add(selectedPost.link);
          }
          
          topPosts.splice(randomIndex, 1);
        }
        
        setNews(randomPosts);
      }
    };

    fetchAndSetNews();
    fetchSlides();
  }, []);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleImageSelect = (selectedIndex) => {
    setImageIndex(selectedIndex);
  };
  
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
        {news.map((newsItem, index) => (
          <Col key={index}>
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
                  <span className='text-primary'>{newsItem.category}</span>
                  <i className="bi bi-dot text-muted"></i>
                  <span className='text-secondary'>{formatDate(newsItem.pubDate)}</span>
                </h6>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="py-5 my-5">
        <Col className='col-12 d-flex justify-content-between'>
          <h4 className='news-head-title mb-5'>Rekomendasi Untuk Anda</h4>
          <div style={{height:"30px",width:"90px",backgroundColor:"red"}}></div>
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
        <Col sm={3}>
          <Card className='rounded-0 border-0'>
            <Card.Img alt="" src="https://akcdn.detik.net.id/visual/2024/07/29/olympics-2024-shooting_169.jpeg?w=360&q=90" style={{aspectRatio:"5/",objectFit:"cover",maxHeight:"277px"}} />
            <Card.Body className='px-1'>
              <Card.Title className='fs-6'>Klasemen Medali Emas ASEAN Sepanjang Sejarah Olimpiade</Card.Title>
              <h6 className='mt-4'><span className='text-primary'>Politik</span><i className="bi bi-dot text-muted"></i><span className='text-secondary'>29 Juli 2024</span></h6>
            </Card.Body>
          </Card>
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
        <Col sm={3}>
          <Card className='rounded-0 border-0'>
            <Card.Img alt="" src="https://akcdn.detik.net.id/visual/2024/07/29/olympics-2024-shooting_169.jpeg?w=360&q=90" style={{aspectRatio:"5/",objectFit:"cover",maxHeight:"277px"}} />
            <Card.Body className='px-1'>
              <Card.Title className='fs-6'>Klasemen Medali Emas ASEAN Sepanjang Sejarah Olimpiade</Card.Title>
              <h6 className='mt-4'><span className='text-primary'>Politik</span><i className="bi bi-dot text-muted"></i><span className='text-secondary'>29 Juli 2024</span></h6>
            </Card.Body>
          </Card>
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
        <Col sm={3}>
          <Card className='rounded-0 border-0'>
            <Card.Img alt="" src="https://akcdn.detik.net.id/visual/2024/07/29/olympics-2024-shooting_169.jpeg?w=360&q=90" style={{aspectRatio:"5/",objectFit:"cover",maxHeight:"277px"}} />
            <Card.Body className='px-1'>
              <Card.Title className='fs-6'>Klasemen Medali Emas ASEAN Sepanjang Sejarah Olimpiade</Card.Title>
              <h6 className='mt-4'><span className='text-primary'>Politik</span><i className="bi bi-dot text-muted"></i><span className='text-secondary'>29 Juli 2024</span></h6>
            </Card.Body>
          </Card>
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
