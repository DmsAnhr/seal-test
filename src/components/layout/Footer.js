import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo-w.png'

const Footer = () => {
  return (
    <footer className="text-light pt-5 pb-3 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <div className='d-flex align-items-center'>
              <img alt="" src={logo} width={67}/>
              <h2 className='mb-0 ms-3 text-logo text-white'>Berita Kini</h2>
            </div>
            <p className='mt-3'>© 2023 Berita Kini. All Rights Reserved.</p>
            <h5 className='mt-5'>Ikuti Kami</h5>
            <div className="d-flex">
              <a href="#" className="fs-5 me-3 px-2 rounded rounded-3 bg-light text-dark"><i className="bi bi-youtube"></i></a>
              <a href="#" className="fs-5 me-3 px-2 rounded rounded-3 bg-light text-dark"><i className="bi bi-instagram"></i></a>
              <a href="#" className="fs-5 px-2 rounded rounded-3 bg-light text-dark"><i className="bi bi-facebook"></i></a>
            </div>
          </Col>
          <Col md={2}>
            <h5>Telusuri</h5>
            <ul className="list-unstyled">
              <li className='mb-2'><a href="#" className="text-light">Beranda</a></li>
              <li className='mb-2'><a href="#" className="text-light">Kesehatan</a></li>
              <li className='mb-2'><a href="#" className="text-light">Otomotif</a></li>
              <li className='mb-2'><a href="#" className="text-light">Politik</a></li>
              <li className='mb-2'><a href="#" className="text-light">Olahraga</a></li>
              <li className='mb-2'><a href="#" className="text-light">Nasional</a></li>
              <li className='mb-2'><a href="#" className="text-light">Internasional</a></li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>Bantuan</h5>
            <ul className="list-unstyled">
              <li className='mb-2'><a href="#" className="text-light">Kontak Kami</a></li>
              <li className='mb-2'><a href="#" className="text-light">Laporan Pembajakan</a></li>
              <li className='mb-2'><a href="#" className="text-light">Kebijakan</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Berlangganan Berita Terbaru</h5>
            <Form>
              <Form.Group className="d-flex bg-white p-1 rounded">
                <Form.Control
                  type="email"
                  placeholder="Masukkan email"
                  className="me-2 border-0 ps-1"
                />
                <Button variant="primary">
                <i className="bi bi-send-fill text-white"></i>
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
