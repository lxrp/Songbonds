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

  textarea {
    width: 100%;
    border-radius: 7px;
    cursor: pointer;
  }


  button {
    color: var(--darkblue);
    border-radius: 10px;
    background-color: var(--greywhite);
    height: 40px;
    max-width: 200px;
    font-size: 1em;
    cursor: pointer;
  }


form{
display: flex;
  flex-direction: column;
  margin-bottom: 10px
   

  label input {
    font-size: 1em;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 7px;
    text-align: left;
    width: 100%;
    max-width: 500px;
    cursor: pointer;
  }

  button {
    align-self: center;
    margin-top: 20px;
  }
}
`
