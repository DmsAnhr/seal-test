import React, { useEffect, useState } from 'react';
import { getNewscategory, getPopularNews, getRealtedThree } from '../services/Api';
import NewsCard1 from '../components/ui/news1.js';
import NewsCard4 from '../components/ui/news4.js';
import NewsCard12 from '../components/ui/news12.js';
import { Container, Row, Col, Button} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const Newest = () => {
    const category = "ekonomi";
    const [news, setNews] = useState(null);
    const [trendingNews, setTrendingNews] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAllNews = async () => {
        try {
          const allPosts = await getNewscategory(category);
          setNews(allPosts);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news detail:', error);
          setLoading(false);
        }
      };

      const fetchPopularNews = async () => {
        try {
          const data = await getPopularNews();
          setTrendingNews(data);
        } catch (error) {
          console.error('Error fetching related news:', error);
        }
      };

      const fetchRelated = async () => {
        try {
          const data = await getRealtedThree(category);
          setRelatedNews(data);
        } catch (error) {
          console.error('Error fetching related news:', error);
        }
      };

      fetchAllNews();
      fetchPopularNews();
      fetchRelated();
    }, []);
  
    if (loading) {
      return (
        <Container style={{height:"100vh"}} className='py-5'>
          <Skeleton style={{width:"200px", height:"50px"}} className="d-block rounded bg-light mb-4" />
          <div className='d-flex'>
            <Skeleton style={{width:"30vw", aspectRatio:"3/2"}} className="d-block rounded bg-light me-3" />
            <div>
              <Skeleton style={{width:"30vw", height:"50px"}} className="d-block rounded bg-light mb-4" />
              <Skeleton style={{width:"30vw", height:"50px"}} className="d-block rounded bg-light mb-4" />
            </div>
          </div>
        </Container>
      );
    }
  
    if (!news) {
      return <div>News not found</div>;
    }
  
    return (
      <Container>
        <Row>
          <Col className="col-12">
            <h1 className='news-head-title my-5'>Berita <span className=' text-capitalize'>{category}</span></h1>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            {news.map((newsItem, index) => (
              <NewsCard1 key={index} newsItem={newsItem} index={index} />
            ))}

            <div className='d-none d-sm-flex justify-content-between align-items-center mt-5 pt-5 mb-4'>
              <h4 className='news-head-title mb-0'>Rekomendasi Untuk Anda</h4>
                <Button as="a" href={`/${category}`} variant="outline-primary">Lihat Semua</Button>
            </div>
            <Row className='d-none d-sm-flex'>
              {relatedNews.map((newsItem, index) => (
                <NewsCard4 key={index} newsItem={newsItem} index={index} />
              ))}
            </Row>
          </Col>
          <Col md={4} className='d-none d-md-block'>
            <Row className='sticky-top' style={{top:"120px",zIndex:"98"}}>
              <h4 className='news-head-title mb-5 ms-2'>Berita Terpopuler</h4>
              {trendingNews.map((newsItem, index) => (
                <NewsCard12 key={index} newsItem={newsItem} index={index} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Newest;
