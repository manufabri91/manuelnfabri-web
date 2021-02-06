import React from 'react'

const Resume = () => {
  return (
    <section id='resume' className='section is-medium '>
      <h1 className='title has-text-primary-dark has-text-centered'>RESUME</h1>
      <div className='content container block'>
        <p>
          If you want to know more about my working experience, education and
          skills, soon I will upload it here for reader's convenience. By now,
          you can download a full copy of my resume in PDF.
        </p>
      </div>
      <div className='block has-text-centered'>
        <button
          class='button is-primary'
          onClick={() =>
            window.open(
              'https://1drv.ms/b/s!AvdnWuTtGeQZo6E-EBlKrm0ALhF5oA?e=GcHhNN'
            )
          }
        >
          <span class='icon'>
            <i class='fa fa-download'></i>
          </span>
          <span>Download CV</span>
        </button>
      </div>
    </section>
  )
}

export default Resume
