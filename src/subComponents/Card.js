import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Github } from '../components/AllSvgs'

const shimmer = keyframes`
  0%   { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`

const Box = styled(motion.li)`
  width: 17rem;
  min-height: 22rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 1.8rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${p => p.accent || '#7C6FFF'} 40%, #00E5C3 70%, transparent);
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(124,111,255,0.4);
    box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,111,255,0.1);
    transform: translateY(-4px);
    &::before { opacity: 1; }
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const CardNumber = styled.span`
  font-family: 'Ubuntu Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.12em;
`

const GitLink = styled.a`
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;

  &:hover { color: #a78bfa; }
`

const Title = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(240,239,248,0.95);
  line-height: 1.3;
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  font-family: 'Karla', sans-serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(240,239,248,0.45);
  flex-grow: 1;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0.9rem 0 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.06);
`

const Tag = styled.span`
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.62rem;
  font-family: 'Ubuntu Mono', monospace;
  background: rgba(124,111,255,0.1);
  border: 1px solid rgba(124,111,255,0.2);
  color: rgba(167,139,250,0.8);
`

const DemoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, rgba(124,111,255,0.25), rgba(0,229,195,0.12));
  border: 1px solid rgba(124,111,255,0.35);
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  transition: all 0.25s ease;
  align-self: flex-start;

  &:hover {
    background: linear-gradient(135deg, rgba(124,111,255,0.4), rgba(0,229,195,0.2));
    box-shadow: 0 0 20px rgba(124,111,255,0.3);
  }
`

const NoDemo = styled.span`
  font-size: 0.72rem;
  font-family: 'Ubuntu Mono', monospace;
  color: rgba(255,255,255,0.2);
  padding: 0.5rem 0;
`

const accentColors = ['#7C6FFF','#00E5C3','#FF6B9D','#F59E0B','#06B6D4','#10B981','#8B5CF6','#EC4899']

const Item = {
  hidden: { scale: 0.9, opacity: 0, y: 30 },
  show: {
    scale: 1, opacity: 1, y: 0,
    transition: { type: 'spring', duration: 0.6 }
  }
}

const Card = ({ data }) => {
  const { id, name, description, tags, demo, github } = data
  const accent = accentColors[(id - 1) % accentColors.length]

  return (
    <Box variants={Item} accent={accent}>
      <CardHeader>
        <CardNumber>#{String(id).padStart(2,'0')}</CardNumber>
        {github && (
          <GitLink href={github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
            <Github width={20} height={20} />
          </GitLink>
        )}
      </CardHeader>

      <Title>{name}</Title>
      <Description>{description}</Description>

      <TagRow>
        {tags.map((t, i) => <Tag key={i}>#{t}</Tag>)}
      </TagRow>

      {demo
        ? <DemoLink href={demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
            ↗ Live Demo
          </DemoLink>
        : <NoDemo>// demo coming soon</NoDemo>
      }
    </Box>
  )
}

export default Card
