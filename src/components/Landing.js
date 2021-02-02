import React from 'react';

const Landing = () => {
  return (
    <section id='home' class='hero is-primary is-fullheight'>
      <div class='hero-body'>
        <div class='container has-text-centered'>
          {/* <div className='box has-text-black'> */}
          <h1 class='title'>Hi, there!</h1>
          <h2 class='subtitle'>
            I am Manuel Fabri{' '}
            <span role='img' aria-label='smile'>
              😀
            </span>
          </h2>
          <p>
            I'm a full stack developer, and this will be my online resume. Still
            is a work in progress.
          </p>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Landing;
