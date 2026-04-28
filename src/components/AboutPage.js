import React from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import { DarkTheme } from './Themes'
import { motion } from 'framer-motion'
import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons from '../subComponents/SocialIcons'
import PowerButton from '../subComponents/PowerButton'
import ParticleComponent from '../subComponents/ParticleComponent'
import astronaut from '../assets/Images/spaceman.png'

const gridAnim = keyframes`
  0%   { background-position: 0 0; }
  100% { background-position: 60px 60px; }
`
const floatAnim = keyframes`
  0%, 100% { transform: translateY(-8px) rotate(-2deg); }
  50%       { transform: translateY(12px) rotate(2deg); }
`
const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
`

const Box = styled.div`
  background: #060612;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(124,111,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,111,255,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: ${gridAnim} 10s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
`

const ContentWrap = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  gap: 6rem;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 9rem 3rem 4rem;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 9rem 2rem 4rem;
    gap: 3rem;
  }
`

const TextColumn = styled.div`
  flex: 1;
  min-width: 0;
`

const Eyebrow = styled(motion.span)`
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #00E5C3;
  font-family: 'Ubuntu Mono', monospace;
  display: block;
  margin-bottom: 1rem;
`

const PageTitle = styled(motion.h1)`
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #fff;

  span {
    background: linear-gradient(135deg, #7C6FFF, #00E5C3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Divider = styled(motion.div)`
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, #7C6FFF, #00E5C3);
  border-radius: 2px;
  margin-bottom: 2rem;
`

const Bio = styled(motion.p)`
  font-family: 'Karla', sans-serif;
  font-size: 1rem;
  line-height: 1.9;
  color: rgba(240,239,248,0.6);
  margin-bottom: 1.2rem;
`

const HighlightRow = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`

const StatCard = styled.div`
  flex: 1;
  min-width: 100px;
  padding: 1rem 1.2rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  text-align: center;
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: rgba(124,111,255,0.35);
    background: rgba(124,111,255,0.06);
  }

  strong {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    background: linear-gradient(135deg, #7C6FFF, #00E5C3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  span {
    font-size: 0.72rem;
    color: rgba(240,239,248,0.4);
    font-family: 'Ubuntu Mono', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`

const ResumeBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, rgba(124,111,255,0.2), rgba(0,229,195,0.1));
  border: 1px solid rgba(124,111,255,0.4);
  padding: 0.8rem 2rem;
  border-radius: 100px;
  font-family: 'Syne', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, rgba(124,111,255,0.35), rgba(0,229,195,0.2));
    border-color: rgba(0,229,195,0.5);
    box-shadow: 0 0 30px rgba(124,111,255,0.3);
    transform: translateY(-2px);
  }
`

const ImageColumn = styled.div`
  width: 280px;
  flex-shrink: 0;
  position: relative;

  @media (max-width: 900px) { width: 220px; }
`

const FloatingAstronaut = styled.img`
  width: 100%;
  height: auto;
  animation: ${floatAnim} 5s ease-in-out infinite;
  filter: drop-shadow(0 0 40px rgba(124,111,255,0.4));
`

const GlowOrb = styled.div`
  position: absolute;
  bottom: -30px; left: 50%;
  transform: translateX(-50%);
  width: 160px; height: 40px;
  background: radial-gradient(ellipse, rgba(124,111,255,0.4), transparent 70%);
  border-radius: 50%;
  animation: ${glowPulse} 3s ease-in-out infinite;
  filter: blur(8px);
`

const BigBg = styled.div`
  position: fixed;
  bottom: -2rem;
  right: -2rem;
  font-family: 'Syne', sans-serif;
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  color: rgba(255,255,255,0.02);
  user-select: none;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.05em;
`

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

const AboutPage = () => (
  <ThemeProvider theme={DarkTheme}>
    <Box>
      <LogoComponent theme="dark" />
      <SocialIcons theme="dark" />
      <PowerButton />
      <ParticleComponent theme="dark" />

      <ContentWrap>
        <TextColumn>
          <Eyebrow {...fade(0.2)}>Who I Am</Eyebrow>
          <PageTitle {...fade(0.35)}>
            About <span>Me.</span>
          </PageTitle>
          <Divider {...fade(0.45)} />

          <Bio {...fade(0.55)}>
            I'm a <strong style={{color:'rgba(167,139,250,0.9)'}}>MERN Stack Developer</strong> based
            in India, passionate about building intelligent, real-time, and scalable web applications.
          </Bio>
          <Bio {...fade(0.65)}>
            I've built multiple full-stack projects powered by modern technologies like React.js,
            Node.js, Express, and MongoDB — many of which integrate AI APIs, voice features, and
            real-time data flow.
          </Bio>
          <Bio {...fade(0.75)}>
            My work focuses on performance, clean UI, and user-first experiences. I'm enthusiastic
            about integrating OpenAI, Gemini, and real-time speech tools into everyday applications.
          </Bio>

          <HighlightRow {...fade(0.9)}>
            <StatCard>
              <strong>8+</strong>
              <span>Projects</span>
            </StatCard>
            <StatCard>
              <strong>1+</strong>
              <span>Years Exp</span>
            </StatCard>
            <StatCard>
              <strong>MERN</strong>
              <span>Stack</span>
            </StatCard>
          </HighlightRow>

          <motion.div {...fade(1.05)}>
            <ResumeBtn href="/CV_Jitendra.pdf" download>
              📄 Download Resume
            </ResumeBtn>
          </motion.div>
        </TextColumn>

        <ImageColumn>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FloatingAstronaut src={astronaut} alt="spaceman" />
            <GlowOrb />
          </motion.div>
        </ImageColumn>
      </ContentWrap>

      <BigBg>ABOUT</BigBg>
    </Box>
  </ThemeProvider>
)

export default AboutPage
