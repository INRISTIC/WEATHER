import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Helvetica Neue';
    src: url('./assets/fonts/HelveticaNeue.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --background-color: linear-gradient(180deg, #20D1BC 0%, #1AADE3 100%);
    --text-color: #363537;
    --toggle-border: #FFF;
    --toggle-background: #FFF;
    --toggle-text-color: #1AAFE0;
    --gradient: linear-gradient(#39598A, #79D7ED);

    --input-background: #e0f7fa;
    --input-color: #006064;
    --input-border-color: #b2ebf2;
    --input-hover-background: #b2dfdb;
    --input-hover-border-color: #80deea;
  }

  body.dark-theme {
    --background-color: linear-gradient(180deg, #1A1A2E 0%, #16213E 100%);
    --text-color: #FAFAFA;
    --toggle-border: #6B8096;
    --toggle-background: #d8dbe0;
    --toggle-text-color: #28292c;
    --gradient: linear-gradient(#091236, #1E215D);

    --input-background: #003d60;
    --input-color: #e2f2f1;
    --input-border-color: #00396b;
    --input-hover-background: #00395c;
    --input-hover-border-color: #003d40;
  }

  html {
    overflow: -moz-scrollbars-none; /* Для старых версий Firefox */
    -ms-overflow-style: none; /* Для Internet Explorer и Edge */
    scrollbar-width: none; /* Для современных версий Firefox */
  }

  html::-webkit-scrollbar {
      display: none; /* Для WebKit-браузеров (Chrome, Safari) */
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    background: transparent var(--background-color) 0% 0% no-repeat padding-box;
    color: var(--text-color);
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
