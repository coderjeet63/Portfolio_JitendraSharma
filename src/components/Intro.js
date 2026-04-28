import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Me from '../assets/Images/profile-img.png'

const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 65vw;
  height: 55vh;
  display: flex;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  box-shadow: 0 0 60px rgba(124,111,255,0.12);
  z-index: 1;
`

const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;

  .pic {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
    height: auto;
  }
`

const Text = styled(motion.div)`
  font-size: calc(1em + 1.5vw);
  color: #F0EFF8;
  padding: 2rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1{
    background: linear-gradient(135deg, #7C6FFF, #00E5C3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
  }

  h3{
    color: #F0EFF8;
  }

  & > *:last-child {
    color: rgba(240,239,248,0.65);
    font-size: calc(0.5rem + 1.5vw);
    font-weight: 300;
  }

  h6{
    color: rgba(240,239,248,0.6);
  }
`

const Intro = () => {
  return (
    <Box
      initial={{ height: 0 }}
      animate={{ height: '55vh' }}
      transition={{ type: 'spring', duration: 2, delay: 0.5 }} // container opens first
    >
      {/* Text Side */}
      <SubBox>
        <Text
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }} // show text after delay
        >
          <h1>Hello,</h1>
          <h3>I'm Jitendra Sharma.</h3>
          <h6>
            A passionate MERN Stack Developer building AI-powered, real-time web applications
            that are fast, functional, and futuristic.
          </h6>
        </Text>
      </SubBox>

      {/* Image Side */}
<SubBox>
  <motion.img
    className="pic"
    src={Me}
    alt="Profile Pic"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, delay: 1.75, ease: 'easeOut' }}
  />
</SubBox>


    </Box>
  )
}

export default Intro


