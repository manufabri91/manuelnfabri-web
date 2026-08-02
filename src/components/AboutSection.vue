<script setup lang="ts">
function openCv() {
  window.open('https://1drv.ms/b/s!AvdnWuTtGeQZo6E-EBlKrm0ALhF5oA?e=GcHhNN')
}
</script>

<template>
  <section id="about" class="section is-medium has-background-dark">
    <div class="container is-flex content is-justify-content-center">
      <article class="media">
        <figure class="image is-128x128">
          <img class="is-rounded" src="@/assets/avatar.png" alt="avatar" />
        </figure>
        <div class="content has-text-grey-light">
          <h3 class="title has-text-accent-dark">About Me</h3>
          <p class="mb-1">
            I'm naturally curious, excited for challenges, with a good eye for details, and
            always working on improving my skills and learning about new technologies or tools.
          </p>
          <p class="mb-1">
            Since 2018 I enjoy being a full stack developer. Right now I'm working full-time with
            React and Python, but in the past I worked several years with Angular and .Net. Also,
            in my free time, I enjoy doing some side cross-device projects using React, Flutter
            and Spring Boot.
          </p>
          <p>
            In the beginning of my professional journey back in 2014 and until 2018, I've played
            different roles from QA automation developer to support and business analyst which I
            consider that gave me another point of view and helps me to be successful as a
            software developer.
          </p>
          <h3 class="title has-text-accent-dark">Contact Details</h3>
          <div class="columns">
            <div class="column is-one-third">
              <p class="mb-2">Manuel Fabri</p>
              <p class="mb-2">Madrid</p>
              <p class="mb-2">Madrid, Spain</p>
              <p class="mb-2">+34 608 77 05 29</p>
              <p>
                <a href="mailto:manuelnfabri@gmail.com"><strong>manuelnfabri@gmail.com</strong></a>
              </p>
            </div>
            <div class="column">
              <button class="button is-primary" @click="openCv">
                <span class="icon"><i class="fa fa-download"></i></span>
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
article.media {
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  article.media {
    justify-content: initial;
    flex-wrap: initial;
  }
}
</style>
