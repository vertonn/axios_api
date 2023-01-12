import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-family: "Lexend", sans-serif;
  }

  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #eef2fd;
  }

`;

export default Global;
