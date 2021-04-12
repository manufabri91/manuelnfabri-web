import React from 'react'
import './About.scss'
import avatar from '../assets/avatar.png'

const About = () => {
  return (
    <section id='about' className='section is-small'>
      <h1 className='title has-text-primary-dark has-text-centered'>
        ABOUT ME
      </h1>
      <div className='container is-flex content is-justify-content-center'>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-128x128'>
              <img alt='avatar' height='10' src={avatar} />
            </p>
          </figure>
          <div className='media-content'>
            <div className='content'>
              <p>
                I have always been interested in technology, even when I was a
                kid I was already playing around with computers, consoles and
                hardware.
              </p>
              <p>
                Since the beginning of my professional journey back in 2014,
                I've played different roles like QA automation developer,
                support and business analyst and full stack developer.
              </p>
              <p>
                I'm naturally curious, super attentive to details, and always working on improving my skills
              </p>
            </div>
          </div>
        </article>
        <div></div>
      </div>
    </section>
  )
}

export default About
