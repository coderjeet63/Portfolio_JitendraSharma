import { createGlobalStyle } from "styled-components";



const GlobalStyle = createGlobalStyle`

*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
h1,h2,h3,h4,h5,h6{
    display: inline-block;
    font-family: 'Syne', sans-serif;
}


body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'DM Sans', sans-serif;
    background: #0A0A0F;
    color: #F0EFF8;
}

`

export default GlobalStyle;