import React from 'react'
import styled from 'styled-components'
import { DarkTheme } from '../components/Themes'




const Logo = styled.h1`
display: inline-block;
background: linear-gradient(90deg, #7C6FFF, #00E5C3);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent;
font-family: 'Syne', sans-serif;
font-weight: 800;

position: fixed;
left: 2rem;
top: 2rem;
z-index:3;

@media (max-width: 768px) {
  display: none;
}
`

const LogoComponent = (props) => {
    return (
        <Logo color={props.theme}>
          JS
        </Logo>
    )
}

export default LogoComponent
