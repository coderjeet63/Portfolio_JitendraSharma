// Home button

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PowerBtn } from '../components/AllSvgs'


const Power = styled(NavLink)`
position: fixed;
top: 2rem;
left: 50%;
transform: translate(-50%, 0);

background-color: #FCF6F4;
padding: 0.3rem;
border-radius: 50%;
border: 1px solid rgba(255,255,255,0.10);
width: 2.5rem;
height: 2.5rem;

display: flex;
justify-content: center;
align-items:center;
z-index:999;

cursor: pointer;
text-decoration: none;
color: inherit;

&:hover{
    background-color: rgba(124,111,255,0.12);
    box-shadow: 0 0 10px 6px rgba(124,111,255,0.5);
}
`

const PowerButton = () => {
    return (
        <Power to="/" aria-label="Back to home">
        <PowerBtn width={30} height={30} fill='currentColor' />
        </Power>
    )
}

export default PowerButton
