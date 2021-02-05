import React from 'react';
import './Landing.scss';
import heroImage from '../assets/hero-image.svg'
import { Link } from 'react-scroll';

const Landing = () => {
  return (
    <section id='home' className='hero is-dark is-fullheight'>
      <img alt="Fill Murray" className="hero-background is-dark" src={heroImage} />
      <div className='hero-body'>
        <div className='container'>
          <div className='box has-background-black' style={{opacity: '.8'}}>
            <h3 className="title is-3 has-text-centered">Hi, there!</h3>
            <h4 className='title is-4 has-text-centered'>I'm Manuel Fabri
              <span role='img' aria-label='smile'>
                😀
              </span>
            </h4>
            <p className='has-text-white'>
              A software developer based in Rosario (Argentina), currently employed full-time by Grupo San Cristobal where I work as a fullstack developer for one of their web applications.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-footer">
        <div className='container has-text-centered'>
          <Link to='about' spy={true} smooth={true}>
            <i  className="fas fa-chevron-circle-down" style={{fontSize:'3rem', marginBottom: '3rem'}}/>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
