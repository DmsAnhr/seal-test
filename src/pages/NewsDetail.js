import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByCategory, getAllNews,getPopularNews, getRealtedThree } from '../services/Api';
import { Breadcrumb, Container, Row, Col, Form, Button, Card, Badge  } from 'react-bootstrap';
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";

const NewsDetail = () => {
    const { category, link } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);
    const [trendingNews, setTrendingNews] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const removeBaseUrl = (url) => {
      const baseUrl = 'https://www.cnnindonesia.com/';
      const raw = url.replace(baseUrl, '')
      
      return encodeURIComponent(raw);
    };
  
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
      };

    useEffect(() => {
      const fetchNewsDetail = async () => {
        try {
          const decodedLink = decodeURIComponent(link);
          const allPosts = await getNewsByCategory(category);
          const selectedPost = allPosts.find(post => post.link.endsWith(decodedLink));
          setNewsDetail(selectedPost);
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

      fetchNewsDetail();
      fetchPopularNews();
      fetchRelated();
    }, [category, link]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!newsDetail) {
      return <div>News not found</div>;
    }
  
    return (
      <Container style={{minHeight:'100vh'}}>
        <Row>
          <Col className="col-12">
            <Breadcrumb className='bc-dividers my-5'>
              <Breadcrumb.Item href="/"><i className="bi bi-house me-2"></i>Beranda</Breadcrumb.Item>
              <Breadcrumb.Item href={`/${category}`}>
                {category}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Detail</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h1 className='mb-0'>{newsDetail.title}</h1>
            <h6 style={{fontSize:"1vw"}} className='py-4'>
              <span className='text-primary text-capitalize'>{newsDetail.category}</span>
              <i className="bi bi-dot text-muted"></i>
              <span className='text-secondary'>{formatDate(newsDetail.pubDate)}</span>
            </h6>
            <img src={newsDetail.thumbnail} alt={newsDetail.title} className='w-100 rounded rounded-3 mb-2'/>
            <p className='img-thumb'>{newsDetail.description}</p>
            <p className='my-5 pb-5 main-news'>
              Ini adalah data dummy sehingga Anda tidak perlu membaca sampai habis. Fenomena yang tidak bisa dijelaskan ini muncul secara tiba-tiba di berbagai platform, menciptakan kebingungan dan rasa penasaran. Dengan rincian yang ambigu dan informasi yang tidak lengkap, berita ini hanya bertujuan untuk mengisi ruang dan tidak menawarkan wawasan yang berarti. Semua data yang disajikan adalah fiktif dan tidak relevan dengan kenyataan.
              <br/><br/>
              Di tengah kebingungan yang melanda, banyak spekulasi mulai beredar mengenai penyebab fenomena ini. Namun, informasi yang ada hanya berupa omong kosong dan tidak memiliki dasar yang kuat. Sejumlah teori yang muncul tidak lebih dari imajinasi belaka dan tidak dapat dipertanggungjawabkan. Artikel ini hanya berfungsi sebagai tempat untuk menempatkan teks dummy tanpa memberikan informasi yang valid.
              <br/><br/>
              Dalam kesimpulan yang tidak perlu, tidak ada yang benar-benar dapat diambil dari berita ini. Semua konten yang ditampilkan adalah hasil dari pemikiran acak dan tidak ada relevansi dengan situasi dunia nyata. Jika Anda mencari informasi yang bermanfaat, kami sarankan untuk mencari sumber lain yang lebih dapat dipercaya. Berita ini hanya untuk tujuan hiburan dan tidak memiliki nilai berita yang sesungguhnya.
            </p>

            
            <h4 className='news-head-title mb-5'>Komentar</h4>
            <div className="comment-form mb-4 pb-4 ps-3 d-flex border-bottom">
              <img src={avatar1} alt="Avatar" className="me-3" width="50" height="50" />
              <Form className='w-100'>
                <Form.Group controlId="commentForm.ControlTextarea">
                  <Form.Control as="textarea" rows={3} placeholder="Apa yang ingin anda tanyakan?" maxLength={50} />
                  <div className="w-100 d-flex justify-content-end mt-2">
                    <span>0/50</span>
                  </div>
                </Form.Group>
                <Button variant="primary" className='text-white'>Kirim</Button>
              </Form>
            </div>
            <div className="comment ps-3 border-bottom">
              <div className="d-flex mb-3">
                <img src={avatar2} alt="Avatar" className="me-3" width="50" height="50" />
                <div>
                  <div className='d-flex align-items-center'>
                    <h6 className='text-secondary mb-0'>UJANG YUSMEIDI S.P., M.Agr.</h6>
                    <i className="bi bi-dot fs-2 text-muted"></i>
                    <p className="text-muted mb-0">28 Mar 2024 11:15</p>
                  </div>
                  <p>Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya?</p>
                  <Button variant="link" className="p-0 text-decoration-none">Balas</Button>
                </div>
              </div>

              <div className="d-flex mb-3 ms-5">
                <img src={avatar3} alt="Avatar" className="me-3" width="50" height="50" />
                <div>
                  <div className='d-flex align-items-center'>
                    <h6 className='text-secondary mb-0'>DINA RIKHA RIYANAWATI, S.Pd</h6>
                    <i className="bi bi-dot fs-2 text-muted"></i>
                    <p className="text-muted mb-0">28 Mar 2024 11:15</p>
                  </div>
                  <p>saya mengunduh sertifikatnya kok juga belum bisa</p>
                  <Button variant="link" className="p-0 text-decoration-none">Balas</Button>
                </div>
              </div>
            </div>

            <div className="pagination-section d-flex justify-content-between align-items-center">
              <div className='d-flex align-items-center'>
                <span>Item per page</span>
                <Form.Select aria-label="Items per page" size="sm" className="w-auto mx-2">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </Form.Select>
                <span>of 200</span>
              </div>
              <div className="d-flex justify-content-center align-items-center my-4">
                <Button variant="ts" className='text-primary me-3'>
                  <i className="bi bi-chevron-left me-3 text-secondary"></i> 1
                </Button>
                <Button variant="ts" className='text-secondary'>
                  2 <i className="bi bi-chevron-right ms-3"></i>
                </Button>
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-5 pt-5 mb-4'>
              <h4 className='news-head-title mb-0'>Rekomendasi Untuk Anda</h4>
                <Button as="a" href={`/${category}`} variant="outline-primary">Lihat Semua</Button>
            </div>
            <Row>
              {relatedNews.map((item, index) => (
                <Col as="a" href={`/news/${item.category}/${removeBaseUrl(item.link)}`} sm={4} key={index} className='mb-0 mb-sm-5 col-4-news'>
                  <Card className='rounded-0 border-0'>
                    <Card.Img alt="" src={item.thumbnail} style={{ aspectRatio: "5/4", objectFit: "cover", maxHeight: "277px" }} />
                    <Card.Body className='px-1'>
                      <Card.Title className='fs-6 clamp-3 mb-0'>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  <h6 className='px-1'>
                    <span className='text-primary text-capitalize'>{item.category}</span>
                    <i className="bi bi-dot text-muted"></i>
                    <span className='text-secondary'>{formatDate(item.pubDate)}</span>
                  </h6>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <Row className='sticky-top' style={{top:"150px",zIndex:"98"}}>
              <h4 className='news-head-title mb-5 ms-2'>Berita Terpopuler</h4>
              {trendingNews.map((newsItem, index) => (
                <Col key={index} as="a" href={`/news/${newsItem.category}/${removeBaseUrl(newsItem.link)}`} className='col-3-news col-12 mb-4'>
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
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default NewsDetail;
