import React, { useState, useEffect }  from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logoW from '../../assets/images/logo-w.png';

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      bg={scrolled ? "primary" : "white"}
      variant={scrolled ? "dark" : "light"}
      expand="md"
      className={`${scrolled ? 'scrolled' : 'border-bottom'}`}
      sticky="top"
      style={{zIndex:"99"}}
    >
      <Container>
        <Navbar.Brand href="/" className='d-flex align-items-center'>
          <img
            alt=""
            src={scrolled ? logoW : logo}
            width="44"
            height="44"
            className="d-inline-block align-top me-2"
          />{' '}
          <span className={`text-logo fs-5 ${scrolled ? 'text-white' : 'text-navy'}`}>Berita Kini</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Beranda
            </NavLink>
            <NavLink to="/terbaru" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Terbaru
            </NavLink>
            <NavLink to="/hiburan" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Hiburan
            </NavLink>
            <NavLink to="/gaya-hidup" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Gaya Hidup
            </NavLink>
            <NavLink to="/olahraga" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Olahraga
            </NavLink>
            {/* <NavLink to="/teknologi" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Teknologi
            </NavLink>
            <NavLink to="/ekonomi" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Ekonomi
            </NavLink> */}
            <NavLink to="/nasional" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Nasional
            </NavLink>
            <NavLink to="/internasional" className={({ isActive }) => `me-3 ${isActive ? 'text-primary' : 'text-secondary'}`}>
              Internasional
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
