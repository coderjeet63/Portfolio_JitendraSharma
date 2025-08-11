import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from './Themes'

import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons from '../subComponents/SocialIcons'
import PowerButton from '../subComponents/PowerButton'
import ParticleComponent from '../subComponents/ParticleComponent'
import BigTitle from '../subComponents/BigTitlte'
import astronaut from '../assets/Images/spaceman.png'

// ========== Styled Components ==========

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  min-height: 100vh; /* ✅ Allow full scroll height */
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;   /* ✅ Fix scrolling issue */
`

const float = keyframes`
  0% { transform: translateY(-10px) }
  50% { transform: translateY(15px) translateX(15px) }
  100% { transform: translateY(-10px) }
`

const Spaceman = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 20vw;
  animation: ${float} 4s ease infinite;
  img {
    width: 100%;
    height: auto;
  }
`

const Main = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  min-height: 60vh; /* ✅ Let height auto-expand */
  z-index: 3;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);
  overflow-y: auto;

  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.text};
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 80vw;
    padding: 1.5rem;
    left: 10%;
    top: 8rem;
  }
`

const ResumeButton = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.text};
  padding: 0.5rem 1.5rem;
  margin-top: 2rem;
  font-size: 1rem;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  align-self: center;

  &:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`

// ========== Component ==========

const AboutPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
        <ParticleComponent theme="dark" />

        <Spaceman>
          <img src={astronaut} alt="spaceman" />
        </Spaceman>

        <Main>
          I’m a MERN Stack Developer based in India, passionate about building intelligent, real-time,
          and scalable web applications.
          <br />
          <br />
          I’ve built multiple full-stack projects powered by modern technologies like React.js, Node.js,
          Express, and MongoDB — many of which integrate AI APIs, voice features, and real-time data flow.
          <br />
          <br />
          My work focuses on performance, clean UI, and user-first experiences. I'm also enthusiastic about
          integrating OpenAI, Gemini, and real-time speech tools into everyday applications.
          <br />
          <br />
          I'm constantly learning, exploring new technologies, and solving real-world problems through code.
          Let’s build something great together!
          <ResumeButton href="/CV_Jitendra.pdf" download>
            📄 Download Resume
          </ResumeButton>
        </Main>

        <BigTitle text="ABOUT" top="10%" left="5%" />
      </Box>
    </ThemeProvider>
  )
}

export default AboutPage
