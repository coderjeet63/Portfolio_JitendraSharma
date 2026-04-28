import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'
import { YinYang } from './AllSvgs'
import Intro from './Intro'

const MainContainer = styled.div`
background: #0A0A0F;
width: 100vw;
height: 100vh;
overflow:hidden;
position: relative;

&::before{
  content:"";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
  filter: blur(120px);
  background:
    radial-gradient(600px 600px at 10% 12%, rgba(124,111,255,1) 0%, rgba(124,111,255,0) 60%),
    radial-gradient(700px 700px at 88% 88%, rgba(0,229,195,1) 0%, rgba(0,229,195,0) 60%),
    radial-gradient(650px 650px at 50% 28%, rgba(255,107,157,1) 0%, rgba(255,107,157,0) 60%);
}

h2,h3,h4,h5,h6{
  font-family:'Syne', sans-serif ;
  font-weight:500;
}

& > *{
  position: relative;
  z-index: 1;
}

& > *::before{
  z-index: 0;
}

/* Intro image side ambient background */
& div > div:nth-child(2){
  background: radial-gradient(circle at center, rgba(124,111,255,0.12) 0%, transparent 70%);
}
`

const Container = styled.div`
padding: 2rem;
`

const SKILLS = styled(NavLink)`
color: rgba(240,239,248,0.5);
position: absolute;
top: 50%;
right: calc(1rem + 2vw);
transform: rotate(90deg) translate(-50%, -50%);
text-decoration: none;
z-index:3;
font-family: 'Syne', sans-serif;
font-size: 1.8rem;
font-weight: 700;
letter-spacing: 0.05em;
transition: color 0.25s ease, text-shadow 0.25s ease;

&:hover {
  color: #a78bfa;
  text-shadow:
    0 0 10px rgba(167,139,250,0.9),
    0 0 25px rgba(124,111,255,0.7),
    0 0 50px rgba(124,111,255,0.4);
}
`

const WORK = styled(NavLink)`
color: rgba(240,239,248,0.5);
position: absolute;
top: 45%;
left: calc(1rem + 2vw);
transform: translate(-50%, -50%) rotate(-90deg);
text-decoration: none;
z-index:3;
font-family: 'Syne', sans-serif;
font-size: 1.8rem;
font-weight: 700;
letter-spacing: 0.05em;
transition: color 0.25s ease, text-shadow 0.25s ease;

&:hover {
  color: #a78bfa;
  text-shadow:
    0 0 10px rgba(167,139,250,0.9),
    0 0 25px rgba(124,111,255,0.7),
    0 0 50px rgba(124,111,255,0.4);
}
`

const BottomBar = styled.div`
position: absolute;
bottom: 1rem;
left: 0;
right: 0;
width: 100%;
display: flex;
justify-content: space-evenly;
`

const ABOUT = styled(NavLink)`
  color: rgba(240,239,248,0.5);
  text-decoration: none;
  z-index: 3;
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: color 0.25s ease, text-shadow 0.25s ease;

  &:hover {
    color: #a78bfa;
    text-shadow:
      0 0 10px rgba(167,139,250,0.9),
      0 0 25px rgba(124,111,255,0.7),
      0 0 50px rgba(124,111,255,0.4);
  }
`

const EXPERIENCE = styled(NavLink)`
  color: rgba(240,239,248,0.5);
  text-decoration: none;
  z-index: 3;
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: color 0.25s ease, text-shadow 0.25s ease;

  &:hover {
    color: #a78bfa;
    text-shadow:
      0 0 10px rgba(167,139,250,0.9),
      0 0 25px rgba(124,111,255,0.7),
      0 0 50px rgba(124,111,255,0.4);
  }
`

const rotate = keyframes`
from{
    transform: rotate(0);
}
to{
    transform: rotate(360deg);
}
`

const Center = styled.button`
position: absolute;
top: ${props => props.click ? '85%' :'50%'};
left: ${props => props.click ? '92%' :'50%'};
transform: translate(-50%,-50%);
border: none;
outline: none;
background-color: transparent;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: all 1s ease;

&>:first-child{
    animation: ${rotate} infinite 1.5s linear;
}

&>:last-child{
    display: ${props => props.click ? 'none' :'inline-block'};
    padding-top: 1rem;
}
`

const DarkDiv = styled.div`
position: absolute;
top: 0;
background: linear-gradient(135deg, #0A0A0F 0%, #1a1040 100%);
bottom: 0;
right: 50%;
width: ${props => props.click ? '50%' : '0%'};
height: ${props => props.click ? '100%' : '0%'};
z-index:1;
transition: height 0.5s ease, width 1s ease 0.5s;
`

const Main = () => {
    const [click, setClick] = useState(true);

    const handleClick = () => setClick(!click);

    return (
        <MainContainer>
         <DarkDiv click={click}/>
            <Container>
            <PowerButton />
            <LogoComponent theme={click ? 'dark' :'light'}/>
            <SocialIcons theme={click ? 'dark' :'light'} />
           
            <Center click={click}>
                <YinYang onClick={()=> handleClick()} width={click ? 120 : 200} height={click ? 120 : 200} fill='currentColor' />
                <span>click here</span>
            </Center>

            <SKILLS to="/skills">
                <motion.h2
                initial={{ y:-200, transition: { type:'spring', duration: 1.5, delay:1} }}
                animate={{ y:0, transition: { type:'spring', duration: 1.5, delay:1} }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Skills
                </motion.h2>
            </SKILLS>

            <WORK to="/work">
                <motion.h2
                initial={{ y:-200, transition: { type:'spring', duration: 1.5, delay:1} }}
                animate={{ y:0, transition: { type:'spring', duration: 1.5, delay:1} }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Work
                </motion.h2>
            </WORK>

            <BottomBar>
            <ABOUT to="/about">
                <motion.h2
                initial={{ y:200, transition: { type:'spring', duration: 1.5, delay:1} }}
                animate={{ y:0, transition: { type:'spring', duration: 1.5, delay:1} }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    About.
                </motion.h2>
            </ABOUT>
            <EXPERIENCE to="/experience">
                <motion.h2
                initial={{ y:200, transition: { type:'spring', duration: 1.5, delay:1} }}
                animate={{ y:0, transition: { type:'spring', duration: 1.5, delay:1} }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Experience.
                </motion.h2>
            </EXPERIENCE>
            </BottomBar>

            </Container>
            {click ? <Intro click={click} /> : null }
        </MainContainer>
    )
}

export default Main
