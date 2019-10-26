import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SB_Name from '../../images/SB_Name.png'
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
    <React.Fragment>
      <div>
        <ImageStyled src={SB_Name} alt="Songbonds" />
      </div>
      <FormBoxStyled>
        {signUpisActive ? (
          <SignUp toggleSignUp={toggleSignUp} onSignUpClick={onLogin}></SignUp>
        ) : (
          <React.Fragment>
            <Login setActiveUser={setActiveUser} onLoginClick={onLogin}></Login>
            <p>You don't have an account? Create a new one here:</p>
            <button onClick={toggleSignUp}>Sign Up</button>
          </React.Fragment>
        )}
      </FormBoxStyled>
    </React.Fragment>
  )
}

const ImageStyled = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 500px;
`

const FormBoxStyled = styled.section`
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
