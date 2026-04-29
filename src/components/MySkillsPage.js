import React, { useState } from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import { DarkTheme } from './Themes'
import { motion, AnimatePresence } from 'framer-motion'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import ParticleComponent from '../subComponents/ParticleComponent'

const skills = {
  'Frontend': {
    icon: '⚡',
    color: '#7C6FFF',
    items: [
      { name: 'React.js & Redux Toolkit', level: 92 },
      { name: 'Tailwind CSS & UI Design', level: 90 },
      { name: 'Component Architecture', level: 88 },
      { name: 'REST API Integration', level: 90 },
      { name: 'Framer Motion (Animations)', level: 85 },
    ],
  },
  'Backend': {
    icon: '🔧',
    color: '#00E5C3',
    items: [
      { name: 'Node.js & Express.js', level: 92 },
      { name: 'MongoDB & Aggregations', level: 88 },
      { name: 'Redis Pub/Sub & Caching', level: 85 },
      { name: 'Socket.IO (Real-time)', level: 88 },
      { name: 'API Design & RBAC Auth', level: 90 },
    ],
  },
  'AI & Fundamentals': {
    icon: '🧠',
    color: '#FF6B9D',
    items: [
      { name: 'Data Structures & Algorithms', level: 88 },
      { name: 'Gemini AI & WebContainers', level: 85 },
      { name: 'System Architecture & OOP', level: 85 },
      { name: 'Core Java & C', level: 80 },
      { name: 'Query Optimization', level: 85 },
    ],
  },
  'DevOps & Tools': {
    icon: '🚀',
    color: '#F59E0B',
    items: [
      { name: 'Git, GitHub & CI/CD', level: 90 },
      { name: 'Docker & Containerization', level: 75 },
      { name: 'Stripe API & Cloudinary', level: 82 },
      { name: 'MongoDB Atlas & Render', level: 88 },
      { name: 'Postman & Jest Testing', level: 85 },
    ],
  },
}

// ── Keyframes
const gridAnim = keyframes`
  0%   { background-position: 0 0; }
  100% { background-position: 60px 60px; }
`

// ── Styled
const Box = styled.div`
  background: #060612;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

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
  max-width: 1100px;
  margin: 0 auto;
  padding: 9rem 3rem 5rem;

  @media (max-width: 768px) { padding: 8rem 1.5rem 3rem; }
`

const Header = styled(motion.div)`
  margin-bottom: 3rem;
`

const Eyebrow = styled.span`
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #7C6FFF;
  font-family: 'Ubuntu Mono', monospace;
  display: block;
  margin-bottom: 0.6rem;
`

const Title = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;

  span {
    background: linear-gradient(135deg, #7C6FFF, #00E5C3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Divider = styled.div`
  width: 48px; height: 3px;
  background: linear-gradient(90deg, #7C6FFF, #00E5C3);
  border-radius: 2px;
  margin-top: 1rem;
`

const TabRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`

const Tab = styled.button`
  padding: 8px 20px;
  border-radius: 100px;
  border: 1.5px solid ${p => p.active ? p.color : 'rgba(255,255,255,0.1)'};
  background: ${p => p.active ? `${p.color}18` : 'transparent'};
  color: ${p => p.active ? p.color : 'rgba(255,255,255,0.45)'};
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex; align-items: center; gap: 6px;

  &:hover {
    border-color: ${p => p.color};
    color: ${p => p.color};
    background: ${p => p.color}12;
  }
`

const SkillGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
`

const SkillCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;

  &:hover {
    border-color: ${p => p.color}55;
    box-shadow: 0 8px 32px ${p => p.color}18;
    transform: translateY(-3px);
  }
`

const SkillRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const SkillName = styled.span`
  font-family: 'Karla', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
`

const SkillLevel = styled.span`
  font-family: 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  color: ${p => p.color};
  font-weight: 600;
`

const BarTrack = styled.div`
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 100px;
  overflow: hidden;
`

const BarFill = styled.div`
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(90deg, ${p => p.color}, ${p => p.color}88);
  width: ${p => p.level}%;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`

const BigBg = styled.div`
  position: fixed;
  bottom: -2rem; right: -1rem;
  font-family: 'Syne', sans-serif;
  font-size: clamp(6rem, 15vw, 12rem);
  
  @media (max-width: 768px) {
    position: absolute;
  }
  font-weight: 900;
  color: rgba(255,255,255,0.02);
  user-select: none;
  pointer-events: none;
  z-index: 0;
`

const MySkillsPage = () => {
  const [activeTab, setActiveTab] = useState('Frontend')
  const current = skills[activeTab]

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <PowerButton />
        <ParticleComponent theme="dark" />

        <ContentWrap>
          <Header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow>Technical Arsenal</Eyebrow>
            <Title>My <span>Skills.</span></Title>
            <Divider />
          </Header>

          <TabRow>
            {Object.entries(skills).map(([name, data]) => (
              <Tab
                key={name}
                active={activeTab === name}
                color={data.color}
                onClick={() => setActiveTab(name)}
              >
                {data.icon} {name}
              </Tab>
            ))}
          </TabRow>

          <AnimatePresence mode="wait">
            <SkillGrid
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {current.items.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  color={current.color}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <SkillRow>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel color={current.color}>{skill.level}%</SkillLevel>
                  </SkillRow>
                  <BarTrack>
                    <BarFill level={skill.level} color={current.color} />
                  </BarTrack>
                </SkillCard>
              ))}
            </SkillGrid>
          </AnimatePresence>
        </ContentWrap>

        <BigBg>SKILLS</BigBg>
      </Box>
    </ThemeProvider>
  )
}

export default MySkillsPage