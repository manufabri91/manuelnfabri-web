import React from "react";
import "./About.scss";
import avatar from "../assets/avatar.png";

const About = () => {
  return (
    <section id="about" className="section is-medium has-background-dark">
      <div className="container is-flex content is-justify-content-center">
        <article className="media">
          <figure className="image is-128x128">
            <img className="is-rounded" src={avatar} alt="avatar" />
          </figure>
          <div className="content has-text-grey-light">
            <h3 className="title has-text-primary-dark">About Me</h3>
            <p className="mb-1">
              I'm naturally curious, excited for challenges, with a good eye for
              details, and always working on improving my skills and learning
              about new technologies or tools.
            </p>
            <p className="mb-1">
              Since 2018 I enjoy being a full stack developer. Right now I'm
              working full-time with React and Python, but in the past I worked
              several years with Angular and .Net. Also, in my free time, I
              enjoy doing some side cross-device projects using React, Flutter
              and Spring Boot.
            </p>
            <p>
              In the beginning of my professional journey back in 2014 and until
              2018, I've played different roles from QA automation developer to
              support and business analyst which I consider that gave me another
              point of view and helps me to be successful as a software
              developer.
            </p>
            <h3 className="title has-text-primary-dark">Contact Details</h3>
            <div className="columns">
              <div className="column is-one-third">
                <p className="mb-2">Manuel Fabri</p>
                <p className="mb-2">Madrid</p>
                <p className="mb-2">Madrid, Spain</p>
                <p className="mb-2">+34 608 77 05 29</p>
                <p>
                  <a href="mailto:manuelnfabri@gmail.com">
                    <strong>manuelnfabri@gmail.com</strong>
                  </a>
                </p>
              </div>
              <div className="column">
                <button
                  className="button is-primary"
                  onClick={() =>
                    window.open(
                      "https://1drv.ms/b/s!AvdnWuTtGeQZo6E-EBlKrm0ALhF5oA?e=GcHhNN"
                    )
                  }
                >
                  <span className="icon">
                    <i className="fa fa-download"></i>
                  </span>
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </div>
        </article>
        <div></div>
      </div>
    </section>
  );
};

export default About;
