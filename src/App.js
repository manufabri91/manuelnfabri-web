import React from 'react';
import './App.scss';
import Landing from './components/Landing';
import About from './components/About';
import Contact from './components/Contact';
import logo from './logo.png';
import Resume from './components/Resume';

function App() {
  const [isActive, setisActive] = React.useState(false);
  return (
    <div className='app'>
      <nav class='navbar is-transparent is-fixed-top'>
        <div class='navbar-brand'>
          <a class='navbar-item' href='#home'>
            <img src={logo} alt='Manuel Fabri - Developer' />
          </a>
          <div
            data-target='navbarItems'
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            onClick={() => {
              setisActive(!isActive);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div
          id='navbarItems'
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div class='navbar-start'>
            <a class='navbar-item' href='#about'>
              ABOUT ME
            </a>
            <a class='navbar-item' href='#resume'>
              RESUME
            </a>
            <a class='navbar-item' href='#contact'>
              CONTACT
            </a>
          </div>
        </div>
      </nav>
      <Landing />
      <About />
      <Resume />
      <Contact />
    </div>
  );
}

export default App;
