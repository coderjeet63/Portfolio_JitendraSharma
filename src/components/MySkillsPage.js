import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from './Themes'
import { Design, Develope } from './AllSvgs'
import { motion } from 'framer-motion'

import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons from '../subComponents/SocialIcons'
import PowerButton from '../subComponents/PowerButton'
import ParticleComponent from '../subComponents/ParticleComponent'
import BigTitle from '../subComponents/BigTitlte'

// ========== Styled Components ==========

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem 0;
`

const MotionCard = styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: 2rem;
  width: 30vw;
  min-height: 60vh;
  z-index: 3;
  line-height: 1.5;
  font-family: 'Ubuntu Mono', monospace;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    width: 80vw;
    margin-bottom: 2rem;
  }
`

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(1em + 1vw);

  ${MotionCard}:hover & {
    & > * {
      fill: ${(props) => props.theme.body};
    }
  }

  & > *:first-child {
    margin-right: 1rem;
  }
`

const Description = styled.div`
  color: ${(props) => props.theme.text};
  font-size: calc(0.6em + 1vw);
  padding: 0.5rem 0;

  ${MotionCard}:hover & {
    color: ${(props) => props.theme.body};
  }

  strong {
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  ul,
  p {
    margin-left: 2rem;
  }
`

// ========== Component ==========

const MySkillsPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box>
        <LogoComponent theme="light" />
        <SocialIcons theme="light" />
        <PowerButton />
        <ParticleComponent theme="light" />

        {/* Design/Creative Card */}
       <MotionCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Title>
            <Develope width={40} height={40} /> Tools & DevOps
          </Title>
          <Description>
            I use modern tools to automate, test, and deploy applications — ensuring performance,
            reliability, and clean workflows.
          </Description>
          <Description>
            <strong>Toolchain</strong>
            <ul>
              <li>Git & GitHub for version control</li>
              <li>Postman, Thunder Client for API testing</li>
              <li>Vercel, Netlify, Firebase for deployment</li>
            </ul>
          </Description>
          <Description>
            <strong>Automation / CI</strong>
            <ul>
              <li>GitHub Actions</li>
              <li>Firebase Hosting</li>
              <li>Custom build/test pipelines</li>
            </ul>
          </Description>
        </MotionCard>
        {/* Development Card */}
        <MotionCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Title>
            <Develope width={40} height={40} /> Full-Stack Developer
          </Title>
          <Description>
            I build scalable, real-time applications using the MERN stack, with strong API logic and clean
            architecture.
          </Description>
          <Description>
            <strong>Skills</strong>
            <p>
              React.js, Node.js, Express, MongoDB, REST APIs, OpenAI/Gemini API, JWT, Tailwind CSS, Redux,
              Web Speech API
            </p>
          </Description>
          <Description>
            <strong>Tools</strong>
            <p>VS Code, GitHub, Postman, MongoDB Compass, Chrome DevTools</p>
          </Description>
        </MotionCard>

        <BigTitle text="SKILLS" top="80%" right="30%" />
      </Box>
    </ThemeProvider>
  )
}

export default MySkillsPage
