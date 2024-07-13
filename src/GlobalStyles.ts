import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Helvetica Neue';
    src: url('./assets/fonts/HelveticaNeue.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    background: transparent ${({ theme }) => theme.background} 0% 0% no-repeat padding-box;
    color: ${({ theme }) => theme.text};
    background-attachment: fixed;
    transition: all 0.50s linear;
    height: 100vh;
  }

  img {
    width: 100%;
    height: 100%;
  }

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
  }
`;