import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Karla', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(124,111,255,0.4);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(124,111,255,0.7);
  }

  ::selection {
    background: rgba(124,111,255,0.35);
    color: #fff;
  }

  a { text-decoration: none; }
  button { cursor: pointer; }
  img { max-width: 100%; }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Syne', sans-serif;
  }
`

export default GlobalStyle
