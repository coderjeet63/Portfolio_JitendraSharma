import React, { useRef } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { motion } from "framer-motion";
import { DarkTheme } from "./Themes";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import ParticleComponent from "../subComponents/ParticleComponent";
import BigTitlte from "../subComponents/BigTitlte";
import { Experiences } from "../data/ExperienceData";

// ─── Animations ──────────────────────────────────────────────────────────────

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 8px #7c6fff55, 0 0 20px #7c6fff22; }
  50%       { box-shadow: 0 0 18px #7c6fffaa, 0 0 40px #7c6fff44; }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const Box = styled.div`
  background-color: ${(p) => p.theme.body};
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  max-width: 860px;
  margin: 0 auto;
  padding: 10rem 2rem 6rem;

  @media (max-width: 768px) {
    padding: 8rem 1.2rem 4rem;
  }
`;

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = styled(motion.div)`
  margin-bottom: 3.5rem;
`;

const SubTag = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #00e5c3;
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Ubuntu Mono", monospace;
`;

const PageTitle = styled.h1`
  font-family: "Karla", sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: ${(p) => p.theme.text};
  line-height: 1.1;
  display: block;

  span {
    background: linear-gradient(135deg, #7c6fff, #00e5c3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #7c6fff, #00e5c3);
  border-radius: 2px;
  margin-top: 1.2rem;
`;

// ─── Timeline ─────────────────────────────────────────────────────────────────

const Timeline = styled.div`
  position: relative;
  padding-left: 2.5rem;

  &::before {
    content: "";
    position: absolute;
    left: 0.45rem;
    top: 0.4rem;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #7c6fff 0%, #00e5c3 60%, transparent 100%);
    border-radius: 2px;
  }
`;

const ExpCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem 2.2rem;
  margin-bottom: 2.2rem;
  backdrop-filter: blur(12px);
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(124, 111, 255, 0.08);
    border-color: rgba(124, 111, 255, 0.35);
    transform: translateX(6px);
  }
`;

const Dot = styled.div`
  position: absolute;
  left: -2.85rem;
  top: 1.8rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c6fff, #00e5c3);
  border: 3px solid #000;
  animation: ${glow} 3s ease-in-out infinite;
  z-index: 2;
`;

// ─── Card internals ───────────────────────────────────────────────────────────

const Period = styled.span`
  font-family: "Ubuntu Mono", monospace;
  font-size: 0.75rem;
  color: #00e5c3;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 0.4rem;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(124, 111, 255, 0.15);
  border: 1px solid rgba(124, 111, 255, 0.35);
  color: #7c6fff;
  margin-bottom: 0.9rem;
`;

const Role = styled.h2`
  font-family: "Karla", sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  color: ${(p) => p.theme.text};
  display: block;
  margin-bottom: 0.25rem;
`;

const Company = styled.p`
  font-size: 0.9rem;
  color: rgba(252, 246, 244, 0.55);
  margin-bottom: 1.4rem;
  font-family: "Ubuntu Mono", monospace;

  span {
    color: rgba(252, 246, 244, 0.35);
    margin: 0 6px;
  }
`;

const Bullets = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
`;

const Bullet = styled.li`
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgba(252, 246, 244, 0.72);
  padding-left: 1.2rem;
  position: relative;
  font-family: "Source Sans Pro", sans-serif;

  &::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #00e5c3;
    font-size: 0.8rem;
    top: 1px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const TagChip = styled.span`
  padding: 5px 13px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: "Ubuntu Mono", monospace;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(252, 246, 244, 0.6);
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: rgba(0, 229, 195, 0.12);
    border-color: rgba(0, 229, 195, 0.4);
    color: #00e5c3;
  }
`;

// ─── Empty state shimmer (future-proof) ───────────────────────────────────────

const ShimmerCard = styled.div`
  height: 260px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s infinite linear;
  margin-bottom: 2rem;
`;

// ─── Framer variants ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const ExperiencePage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
        <ParticleComponent theme="dark" />

        <ContentWrapper>
          <Header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SubTag>Career Journey</SubTag>
            <PageTitle>
              Work <span>Experience</span>
            </PageTitle>
            <Divider />
          </Header>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Experiences.length === 0 ? (
              <>
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : (
              <Timeline>
                {Experiences.map((exp) => (
                  <ExpCard key={exp.id} variants={cardVariants}>
                    <Dot />
                    <Period>{exp.period}</Period>
                    <TypeBadge>{exp.type}</TypeBadge>
                    <Role theme={DarkTheme}>{exp.role}</Role>
                    <Company>
                      {exp.company}
                      <span>·</span>
                      {exp.location}
                    </Company>
                    <Bullets>
                      {exp.bullets.map((b, i) => (
                        <Bullet key={i}>{b}</Bullet>
                      ))}
                    </Bullets>
                    <Tags>
                      {exp.tags.map((t, i) => (
                        <TagChip key={i}>{t}</TagChip>
                      ))}
                    </Tags>
                  </ExpCard>
                ))}
              </Timeline>
            )}
          </motion.div>
        </ContentWrapper>

        <BigTitlte text="EXPERIENCE" top="10%" right="5%" />
      </Box>
    </ThemeProvider>
  );
};

export default ExperiencePage;
