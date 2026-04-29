import { motion, useMotionValue, useSpring } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'
import { Facebook, Github, PowerBtn, Twitter, YouTube, YinYang } from './AllSvgs'
import Intro from './Intro'
import { DarkTheme } from './Themes'
import AboutPage from './AboutPage'
import ExperiencePage from './ExperiencePage'
import WorkPage from './WorkPage'
import MySkillsPage from './MySkillsPage'

const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const floatMobile = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
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

  @media (max-width: 768px) {
    height: auto;
    min-height: 100dvh;
    overflow: visible;
    background: #07091a;
  }
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

  @media (max-width: 768px) {
    background:
      radial-gradient(ellipse 100% 45% at 50% 0%, rgba(100,85,255,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 80% 35% at 100% 100%, rgba(0,210,180,0.08) 0%, transparent 60%);
  }
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

  @media (max-width: 768px) {
    width: 100%;
    background-size: 40px 40px;
    bottom: auto;
    height: 100vh;
  }
`

// ── Side rotated nav labels — exact positions from screenshot ─────────
const SideLink = styled.a`
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

  @media (max-width: 1024px) { font-size: 1.5rem; }
  @media (max-width: 768px) { display: none; }
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

  @media (max-width: 1024px) { font-size: 1.5rem; }
  @media (max-width: 768px) { display: none; }
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

  @media (max-width: 768px) { display: none; }
`

// About = left side = white text
const ABOUT = styled.a`
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

  @media (max-width: 1024px) { font-size: 1.5rem; }
`

// Experience = right side = dark text
const EXPERIENCE = styled.a`
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

  @media (max-width: 1024px) { font-size: 1.5rem; }
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

  @media (max-width: 768px) { display: none; }
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

  @media (max-width: 768px) { display: none; }
`

const CursorRing = styled(motion.div)`
  position: fixed;
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(167,139,250,0.45);
  pointer-events: none;
  z-index: 9998;

  @media (max-width: 768px) { display: none; }
`

/* ─────────────────────────────────────────
   MOBILE LAYOUT
───────────────────────────────────────── */

const MobileLayout = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    min-height: 100dvh;
  }
`

const MobileTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(7, 9, 26, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(124,111,255,0.12);
`

const TopBarLogo = styled.span`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.6rem;
  background: linear-gradient(90deg, #7C6FFF, #00E5C3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`

const TopBarIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const TopBarLinkBtn = styled.a`
  background: rgba(124,111,255,0.1);
  border: 1px solid rgba(124,111,255,0.2);
  border-radius: 8px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
  text-decoration: none;
  color: inherit;
  &:active { background: rgba(124,111,255,0.22); }
`

const TopBarIconBtn = styled.button`
  background: rgba(124,111,255,0.1);
  border: 1px solid rgba(124,111,255,0.2);
  border-radius: 8px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
  &:active { background: rgba(124,111,255,0.22); }
`

const SpinWrapSm = styled.div`
  animation: ${rotateAnim} 4s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Burger = styled.span`
  width: 16px;
  height: 10px;
  position: relative;
  display: inline-block;

  &::before,
  &::after,
  span {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 999px;
    background: rgba(240,239,248,0.85);
  }

  &::before { top: 0; }
  span { top: 4px; }
  &::after { bottom: 0; }
`

const MobileDarkSection = styled.div`
  background: #07091a;
  padding: 1.75rem 1.25rem 0;
  position: relative;
`

const MobileAccentLine = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 1.75rem;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #7C6FFF, #00E5C3);
  border-radius: 2px;
`

const MobileInner = styled.div`
  padding-left: 1rem;
`

const MEyebrow = styled(motion.span)`
  display: block;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #00E5C3;
  margin-bottom: 0.65rem;
`

const MHello = styled(motion.h1)`
  font-family: 'Syne', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.0;
  margin-bottom: 0.15rem;
  background: linear-gradient(135deg, #ffffff 10%, #a78bfa 55%, #00E5C3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const MName = styled(motion.h3)`
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(240,239,248,0.82);
  margin-bottom: 0.75rem;
`

const MBio = styled(motion.p)`
  font-family: 'Karla', sans-serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(240,239,248,0.38);
  margin-bottom: 0;
`

const MTagRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 1rem;
  padding-bottom: 1.25rem;
`

const MTag = styled.span`
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.55rem;
  font-family: 'Ubuntu Mono', monospace;
  border: 1px solid rgba(124,111,255,0.32);
  color: rgba(167,139,250,0.82);
  background: rgba(124,111,255,0.08);
`

const MSocialRow = styled(motion.div)`
  background: rgba(10,12,28,0.95);
  border-top: 1px solid rgba(124,111,255,0.1);
  border-bottom: 1px solid rgba(124,111,255,0.1);
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const MSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(124,111,255,0.2);
  transition: all 0.18s;
  flex-shrink: 0;
  &:active { background: rgba(124,111,255,0.18); transform: scale(0.94); }
`

const MSocialLabel = styled.span`
  font-family: 'Ubuntu Mono', monospace;
  font-size: 0.52rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(124,111,255,0.5);
  margin-left: auto;
`

const MLightSection = styled.div`
  background: linear-gradient(160deg, #f5eef8 0%, #e8f4fb 60%, #dff0ff 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.25rem 2rem;
  min-height: 280px;
  overflow: hidden;
`

const MBadge = styled(motion.div)`
  align-self: flex-end;
  margin-top: 1rem;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(0,229,195,0.12);
  border: 1px solid rgba(0,229,195,0.35);
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  color: #00A887;
  font-family: 'Ubuntu Mono', monospace;
  text-transform: uppercase;

  &::before {
    content: '●';
    margin-right: 5px;
    color: #00E5C3;
    animation: blink 1.6s ease-in-out infinite;
  }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
`

const MAvatarWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  min-height: 200px;
`

const MAvatar = styled(motion.img)`
  height: 240px;
  width: auto;
  object-fit: contain;
  object-position: bottom center;
  animation: ${floatMobile} 5s ease-in-out infinite;
  filter: drop-shadow(0 -4px 20px rgba(124,111,255,0.12));
`

const MYinYangWrap = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1.25rem;
  opacity: 0.35;
`

const MYinYangSpin = styled.div`
  animation: ${rotateAnim} 8s linear infinite;
`

const MNavSection = styled.div`
  background: #07091a;
  border-top: 1px solid rgba(124,111,255,0.12);
  padding: 0.5rem 0 1.5rem;
`

const MNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: rgba(255,255,255,0.55);
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid rgba(124,111,255,0.07);
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: linear-gradient(90deg, rgba(124,111,255,0.15), transparent);
    transition: width 0.25s ease;
  }

  &:active {
    color: #a78bfa;
    &::before { width: 100%; }
  }

  &:last-child { border-bottom: none; }
`

const MNavArrow = styled.span`
  font-size: 0.8rem;
  color: rgba(124,111,255,0.5);
  margin-left: auto;
  font-family: monospace;
`

const MNavNum = styled.span`
  font-family: 'Ubuntu Mono', monospace;
  font-size: 0.55rem;
  color: rgba(124,111,255,0.4);
  letter-spacing: 0.1em;
  width: 1.5rem;
  flex-shrink: 0;
`

const MobileContentWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

// ── Component ─────────────────────────────────────────────────────────
const Main = () => {
  const [click, setClick] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const fade = (delay) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
  })

  const iconFill = DarkTheme.text

  const navItems = [
    { href: '#about',      label: 'About.',      num: '01' },
    { href: '#experience', label: 'Experience.', num: '02' },
    { href: '#work',       label: 'Work.',       num: '03' },
    { href: '#skills',     label: 'Skills.',     num: '04' },
  ]

  return (
    <>
    <MainContainer id="home">
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
      <WORK href="#work">
        <motion.h2 {...spring(-200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          Work
        </motion.h2>
      </WORK>

      {/* SKILLS — right, rotated, dark */}
      <SKILLS href="#skills">
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
        <ABOUT href="#about">
          <motion.h2 {...spring(200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            About.
          </motion.h2>
        </ABOUT>
        <EXPERIENCE href="#experience">
          <motion.h2 {...spring(200, 1)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            Experience.
          </motion.h2>
        </EXPERIENCE>
      </BottomBar>

      {/* Intro panel */}
      {click && <Intro click={click} />}

      {/* Mobile hero layout */}
      <MobileLayout>
        <MobileTopBar>
          <TopBarLogo>JS</TopBarLogo>
          <TopBarIcons>
            <TopBarLinkBtn href="#home" aria-label="Power">
              <PowerBtn width={16} height={16} fill="rgba(240,239,248,0.85)" />
            </TopBarLinkBtn>
            <TopBarIconBtn onClick={() => setClick(v => !v)} aria-label="Toggle">
              <SpinWrapSm>
                <YinYang width={18} height={18} fill="rgba(167,139,250,0.9)" />
              </SpinWrapSm>
            </TopBarIconBtn>
            <TopBarIconBtn aria-label="Menu" onClick={() => setMobileMenuOpen(v => !v)}>
              <Burger><span /></Burger>
            </TopBarIconBtn>
          </TopBarIcons>
        </MobileTopBar>

        <MobileDarkSection>
          <MobileAccentLine />
          <MobileInner>
            <MEyebrow {...fade(0.2)}>Full Stack Engineer</MEyebrow>
            <MHello   {...fade(0.32)}>Hello,</MHello>
            <MName    {...fade(0.42)}>I'm Jitendra Sharma.</MName>
            <MBio     {...fade(0.52)}>
              Architecting scalable, real-time applications. Passionate about
              system design, high-performance backends, and flawless full-stack experiences.
            </MBio>
            <MTagRow  {...fade(0.65)}>
              {['System Design', 'Node.js', 'Redis', 'React'].map(tag => (
                <MTag key={tag}>{tag}</MTag>
              ))}
            </MTagRow>
          </MobileInner>
        </MobileDarkSection>

        <MSocialRow {...fade(0.78)}>
          <MSocialLink href="https://github.com/coderjeet63" target="_blank" rel="noreferrer">
            <Github width={14} height={14} fill={iconFill} />
          </MSocialLink>
          <MSocialLink href="https://dashboard.render.com/" target="_blank" rel="noreferrer">
            <Twitter width={14} height={14} fill={iconFill} />
          </MSocialLink>
          <MSocialLink href="https://www.linkedin.com/in/jitendra-sharma-553136284/" target="_blank" rel="noreferrer">
            <Facebook width={14} height={14} fill={iconFill} />
          </MSocialLink>
          <MSocialLink href="mailto:jitendrasharma.developer@gmail.com" rel="noreferrer">
            <YouTube width={14} height={14} fill={iconFill} />
          </MSocialLink>
          <MSocialLabel>Connect</MSocialLabel>
        </MSocialRow>

        <MLightSection>
          <MBadge
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Open to work
          </MBadge>

          <MAvatarWrap>
            <MAvatar
              src={require('../assets/Images/profile-img.png')}
              alt="Jitendra Sharma"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
            />
          </MAvatarWrap>

          <MYinYangWrap>
            <MYinYangSpin>
              <YinYang width={44} height={44} fill="rgba(100,80,200,0.45)" />
            </MYinYangSpin>
          </MYinYangWrap>
        </MLightSection>

        {mobileMenuOpen && (
        <MNavSection>
          {navItems.map(({ href, label, num }) => (
            <MNavLink
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <MNavNum>{num}</MNavNum>
              {label}
              <MNavArrow>→</MNavArrow>
            </MNavLink>
          ))}
        </MNavSection>
        )}
      </MobileLayout>

      <MobileContentWrapper>
        <div id="about"><AboutPage /></div>
        <div id="experience"><ExperiencePage /></div>
        <div id="work"><WorkPage /></div>
        <div id="skills"><MySkillsPage /></div>
      </MobileContentWrapper>
    </MainContainer>
    </>
  )
}

export default Main
