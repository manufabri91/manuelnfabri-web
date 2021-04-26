import React from 'react';
import './Landing.scss';
import heroImage from '../assets/hero-image.svg';
import { Link } from 'react-scroll';
import { differenceInYears } from 'date-fns/esm';

const Landing = () => {
  const totalYearsOnIT = differenceInYears(new Date(), new Date(2014, 8, 1));
  const totalYearsAsDev = differenceInYears(new Date(), new Date(2018, 8, 1));
  return (
    <section id='home' className='hero is-dark is-fullheight'>
      <img
        alt='background illustration'
        className='hero-background is-dark'
        src={heroImage}
      />
      <div className='hero-body'>
        <div className='container'>
          <div className='box has-background-black' style={{ opacity: '.9' }}>
            <h3 className='title is-3 has-text-centered'>Hi, there!</h3>
            <h4 className='title is-4 has-text-centered'>
              I'm <strong>Manuel Fabri</strong>
              <span role='img' aria-label='smile'>
                😀
              </span>
            </h4>
            <p className='has-text-white'>
              I'm a <strong>software developer</strong> currently based in
              Rosario (Argentina) but{' '}
              <strong>looking forward to relocate abroad</strong>. I have
              <strong>
                {' '}
                over {totalYearsOnIT} years of IT experience
              </strong>{' '}
              which includes more than
              {' ' + totalYearsAsDev + ' '}years of experience building
              beautiful web apps, following best practices and always looking
              for improvements. I have passion for helping others, high
              attention to details and a very proactive attitude.
            </p>
            <div className='buttons has-text-centered is-flex is-justify-content-center'>
              <button
                className='button is-dark'
                onClick={() =>
                  window.open('https://www.linkedin.com/in/manuelnfabri/')
                }
              >
                <span className='icon is-large'>
                  <i className='fab fa-linkedin fa-2x'></i>
                </span>
              </button>
              <button
                className='button is-dark'
                onClick={() => window.open('https://github.com/manufabri91')}
              >
                <span className='icon is-large'>
                  <i className='fab fa-github fa-2x'></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='hero-footer'>
        <div className='container has-text-centered'>
          <Link to='about' spy={true} smooth={true}>
            <i
              className='fas fa-chevron-circle-down arrow'
              style={{ fontSize: '3rem', marginBottom: '3rem' }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
