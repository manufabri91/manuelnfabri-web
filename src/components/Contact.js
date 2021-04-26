import React from 'react';

const Contact = () => {
  return (
    <section
      id='contact'
      className='section is-medium has-background-black has-text-centered'
    >
      <h1 className='title has-text-primary-dark'>CONTACT</h1>
      <div className='content container has-text-grey-light'>
        <div className='block'>
          <p>
            Do you think I could be a great candidate for your company or we can
            start a project together? Feel free to reach me!
          </p>
        </div>
        <div className='block'>
          <span className='icon'>
            <i className='fa fa-envelope'></i>
          </span>
          <a href='mailto:manuelnfabri@gmail.com'>
            <strong>manuelnfabri@gmail.com</strong>
          </a>
        </div>
        <div className='block'>
          <span className='icon'>
            <i className='fab fa-linkedin is-linkedin'></i>
          </span>
          <a
            href='https://www.linkedin.com/in/manuelnfabri/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>linkedin.com/in/manuelnfabri/</strong>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
