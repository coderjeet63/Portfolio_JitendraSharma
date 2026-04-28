import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import Me from '../assets/Images/profile-img.png'

const floatY = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0px);   }
  50%       { transform: translateX(-50%) translateY(-12px); }
`

// ── Outer box: centred overlay spanning both halves — matches screenshot ──
// In the screenshot the card sits roughly from 18% to 50% x, 28% to 78% y
// We keep the original absolute-centred approach, same width/height
const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top:  50%;
  transform: translate(-50%, -50%);
  width:  65vw;
  height: 55vh;
  display: flex;
  z-index: 3;
  border-radius: 0px; /* square card like the screenshot */
  overflow: hidden;
  /* No heavy border — the two halves create the visual split */
  border: none;
  box-shadow: 0 24px 80px rgba(0,0,0,0.45);

  /* Tablet: keep the same desktop layout, just scale it down */
  @media (max-width: 1024px) {
    width: 78vw;
    height: 52vh;
  }

  @media (max-width: 900px) {
    width: 86vw;
    height: 54vh;
  }

  /* Mobile uses the dedicated layout in Main.js */
  @media (max-width: 768px) {
    display: none;
  }
`

// ── LEFT half of the card — sits on the dark side, so dark semi-transparent bg ──
const TextHalf = styled.div`
  width: 50%;
  background: rgba(7, 9, 26, 0.72);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 2.2rem;
  position: relative;

  /* Subtle left accent line */
  &::before {
    content: '';
    position: absolute;
    left: 0; top: 15%; bottom: 15%;
    width: 3px;
    background: linear-gradient(180deg, #7C6FFF, #00E5C3);
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    padding: 2.1rem 1.75rem;
  }
`

const Eyebrow = styled(motion.span)`
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #00E5C3;
  font-family: 'Ubuntu Mono', monospace;
  display: block;
  margin-bottom: 0.8rem;
`

const Hello = styled(motion.h1)`
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 0.25rem;
  /* gradient text matching image 2 purple/teal */
  background: linear-gradient(135deg, #ffffff 10%, #a78bfa 55%, #00E5C3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const NameLine = styled(motion.h3)`
  font-family: 'Syne', sans-serif;
  font-size: clamp(0.9rem, 1.8vw, 1.25rem);
  font-weight: 600;
  color: rgba(240,239,248,0.82);
  margin-bottom: 1.1rem;
`

const Bio = styled(motion.p)`
  font-family: 'Karla', sans-serif;
  font-size: clamp(0.72rem, 1vw, 0.85rem);
  line-height: 1.8;
  color: rgba(240,239,248,0.42);
  max-width: 300px;

  @media (max-width: 1024px) {
    max-width: 340px;
  }
`

const TagRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 1.3rem;
`

const Tag = styled.span`
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.58rem;
  font-family: 'Ubuntu Mono', monospace;
  border: 1px solid rgba(124,111,255,0.35);
  color: rgba(167,139,250,0.8);
  background: rgba(124,111,255,0.09);
`

// ── RIGHT half — sits on the light pinkish side, transparent so bg shows through
const ImageHalf = styled.div`
  width: 50%;
  position: relative;
  /* Completely transparent — light gradient of MainContainer shows through */
  background: transparent;
`

const BadgeDot = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 5px 13px;
  border-radius: 100px;
  background: rgba(0,229,195,0.12);
  border: 1px solid rgba(0,229,195,0.3);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  color: #00E5C3;
  font-family: 'Ubuntu Mono', monospace;
  text-transform: uppercase;
  z-index: 4;

  &::before {
    content: '●';
    margin-right: 5px;
    animation: blink 1.6s ease-in-out infinite;
  }
  @keyframes blink {
    0%,100% { opacity:1; } 50% { opacity:0.2; }
  }
`

// Profile image fills bottom of right half — exactly like screenshot
const ProfileImg = styled(motion.img)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 110%;     /* slightly taller so it fills up, head peeks above card */
  object-fit: contain;
  object-position: bottom center;
  animation: ${floatY} 5s ease-in-out infinite;
  filter: drop-shadow(0 -8px 24px rgba(124,111,255,0.15));

  @media (max-width: 1024px) {
    height: 115%;
  }
`

// ── Framer ─────────────────────────────────────────────────────────────
const boxVars = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: '55vh',
    opacity: 1,
    transition: { type: 'spring', duration: 1.8, delay: 0.3 },
  },
}

const t = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
})

const Intro = () => (
  <Box variants={boxVars} initial="hidden" animate="show">

    {/* Dark text side */}
    <TextHalf>
      <Eyebrow {...t(1.1)}>Full Stack Engineer</Eyebrow>
      <Hello    {...t(1.25)}>Hello,</Hello>
      <NameLine {...t(1.4)}>I'm Jitendra Sharma.</NameLine>
      <Bio      {...t(1.55)}>
        Architecting scalable, real-time applications. Passionate about system design, high-performance backends, and flawless full-stack experiences.
      </Bio>
      <TagRow {...t(1.75)}>
        {['System Design', 'Node.js', 'Redis', 'React'].map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagRow>
    </TextHalf>

    {/* Light image side */}
    <ImageHalf>
      <BadgeDot
        initial={{ opacity:0, y:-8 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:2.2 }}
      >
        Open to work
      </BadgeDot>

      <ProfileImg
        src={Me}
        alt="Jitendra Sharma"
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1.1, delay:1.7, ease:'easeOut' }}
      />
    </ImageHalf>

  </Box>
)

export default Intro