import { motion, useMotionValue, useSpring } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'
import { YinYang } from './AllSvgs'
import Intro from './Intro'

const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

// ── Root: two-tone split exactly like the screenshot ──────────────────
// Left ~50% = very dark navy, right ~50% = light pinkish-white gradient
const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  /* Two-tone background split at 50vw */
  background:
    linear-gradient(to right,
      #07091a 0%,
      #07091a 50%,
      #f5eef8 50%,
      #eaf4fb 100%
    );
`

// Purple/teal glow only on the LEFT dark half
const LeftGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 50% 60% at 2%  8%,  rgba(100,85,255,0.22) 0%, transparent 65%),
    radial-gradient(ellipse 40% 40% at 25% 90%, rgba(0,210,180,0.10)  0%, transparent 60%);
`

// Subtle dot-grid only on left half
const GridOverlay = styled.div`
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 50%;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(124,111,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,111,255,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
`

// All direct children sit above background layers
const Layer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`

// ── Side rotated nav labels — exact positions from screenshot ─────────
const SideLink = styled(NavLink)`
  position: absolute;
  text-decoration: none;
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  z-index: 4;
`

// "Work" — left edge, vertical, white text
const WORK = styled(SideLink)`
  top: 45%;
  left: calc(2rem + 1vw);
  transform: translate(-50%, -50%) rotate(-90deg);
  color: rgba(255,255,255,0.85);

  &:hover {
    color: #a78bfa;
    text-shadow: 0 0 16px rgba(167,139,250,0.8), 0 0 40px rgba(124,111,255,0.5);
  }
`

// "Skills" — right edge, vertical, dark text (on light bg)
const SKILLS = styled(SideLink)`
  top: 50%;
  right: calc(1rem + 1vw);
  transform: rotate(90deg) translate(-50%, -50%);
  color: rgba(30,20,60,0.55);

  &:hover {
    color: #7C6FFF;
    text-shadow: 0 0 16px rgba(124,111,255,0.6);
  }
`

// ── Bottom nav links ─────────────────────────────────────────────────
const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0; right: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 4;
`

// About = left side = white text
const ABOUT = styled(NavLink)`
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  &:hover {
    color: #a78bfa;
    text-shadow: 0 0 16px rgba(167,139,250,0.8);
  }
`

// Experience = right side = dark text
const EXPERIENCE = styled(NavLink)`
  color: rgba(30,20,60,0.45);
  text-decoration: none;
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  &:hover {
    color: #7C6FFF;
    text-shadow: 0 0 16px rgba(124,111,255,0.5);
  }
`

// ── Yin-yang centre button ────────────────────────────────────────────
const CenterBtn = styled.button`
  position: absolute;
  top:  ${p => p.click ? '88%' : '50%'};
  left: ${p => p.click ? '93%' : '50%'};
  transform: translate(-50%, -50%);
  border: none; outline: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
`

const SpinWrap = styled.div`
  animation: ${rotateAnim} 3s linear infinite;
  filter: drop-shadow(0 0 8px rgba(100,80,220,0.5));
`

const ClickHint = styled.span`
  display: ${p => p.hide ? 'none' : 'block'};
  margin-top: 0.6rem;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  font-family: 'Syne', sans-serif;
`

// ── Custom cursor ─────────────────────────────────────────────────────
const CursorDot = styled(motion.div)`
  position: fixed;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #a78bfa;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`

const CursorRing = styled(motion.div)`
  position: fixed;
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(167,139,250,0.45);
  pointer-events: none;
  z-index: 9998;
`

// ── Component ─────────────────────────────────────────────────────────
const Main = () => {
  const [click, setClick] = useState(true)

  const cx = useMotionValue(-100)
  const cy = useMotionValue(-100)
  const rx = useSpring(cx, { stiffness: 180, damping: 20 })
  const ry = useSpring(cy, { stiffness: 180, damping: 20 })

  useEffect(() => {
    const move = e => { cx.set(e.clientX - 4); cy.set(e.clientY - 4) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cx, cy])

  const spring = (from, delay) => ({
    initial: { y: from, opacity: 0 },
    animate: { y: 0,    opacity: 1 },
    transition: { type: 'spring', duration: 1.5, delay },
  })

  return (
    <MainContainer>
      {/* Background layers */}
      <LeftGlow />
      <GridOverlay />

      {/* Custom cursor */}
      <CursorDot style={{ x: cx, y: cy }} />
      <CursorRing style={{ x: rx, y: ry, translateX: '-11px', translateY: '-11px' }} />

      {/* Chrome — theme matches each half */}
      <PowerButton />
      <LogoComponent theme="dark" />
      <SocialIcons theme="dark" />

      {/* WORK — left, rotated, white */}
      <WORK to="/work">
        <motion.h2 {...spring(-200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          Work
        </motion.h2>
      </WORK>

      {/* SKILLS — right, rotated, dark */}
      <SKILLS to="/skills">
        <motion.h2 {...spring(-200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          Skills
        </motion.h2>
      </SKILLS>

      {/* Yin-yang spinner */}
      <CenterBtn click={click} onClick={() => setClick(v => !v)}>
        <SpinWrap>
          <YinYang
            width={click ? 120 : 200}
            height={click ? 120 : 200}
            fill={click ? 'rgba(20,15,50,0.75)' : 'rgba(167,139,250,0.85)'}
          />
        </SpinWrap>
        <ClickHint hide={click}>click here</ClickHint>
      </CenterBtn>

      {/* Bottom nav */}
      <BottomBar>
        <ABOUT to="/about">
          <motion.h2 {...spring(200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            About.
          </motion.h2>
        </ABOUT>
        <EXPERIENCE to="/experience">
          <motion.h2 {...spring(200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            Experience.
          </motion.h2>
        </EXPERIENCE>
      </BottomBar>

      {/* Intro panel */}
      {click && <Intro click={click} />}
    </MainContainer>
  )
}

export default Main