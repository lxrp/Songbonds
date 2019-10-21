import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  :root{
    --orange: #FFAB68;
    --darkblue:#1a548d;
    --lightgrey: #CFD6D6;
    --greywhite: #fffff6;
    
  }

  body {
    margin: 0;
    background: var(--lightgrey);
  }

  input, button, textarea {
    font-size: 1em;
    cursor: pointer;
  }
`
