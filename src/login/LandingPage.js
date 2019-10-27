import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SB_Name from '../images/SB_Name.png'
import Login from './Login'
import SignUp from './SignUp'

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogin: PropTypes.func,
  setActiveUser: PropTypes.func
}

export default function LandingPage({ isLoggedIn, onLogin, setActiveUser }) {
  const [signUpisActive, setSignUpIsActive] = useState(false)
  let history = useHistory()

  isLoggedIn !== null && isLoggedIn && history.push('/home')

  function toggleSignUp() {
    setSignUpIsActive(!signUpisActive)
  }
  return (
    <LandingPageStyled>
      <div>
        <ImageStyled src={SB_Name} alt="Songbonds" />
      </div>
      <FormBoxStyled>
        {signUpisActive ? (
          <SignUp toggleSignUp={toggleSignUp} onSignUpClick={onLogin}></SignUp>
        ) : (
          <React.Fragment>
            <Login setActiveUser={setActiveUser} onLoginClick={onLogin}></Login>
            <SignUpBoxStyled>
              <p>You don't have an account? Create a new one here:</p>
              <button onClick={toggleSignUp}>sign up</button>
            </SignUpBoxStyled>
          </React.Fragment>
        )}
      </FormBoxStyled>
    </LandingPageStyled>
  )
}

const LandingPageStyled = styled.main`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageStyled = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 500px;
`
const SignUpBoxStyled = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  button {
    align-self: center;
  }
`

const FormBoxStyled = styled.section`
  background: var(--darkblue);
  border-radius: 10px;
  color: var(--greywhite);
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  justify-content: space-between;
  align-content: center;

  button {
    width: 50%;
  }
`
