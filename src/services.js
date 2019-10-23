import { setInStorage, getFromStorage } from './Storage'

export function getSongs() {
  return fetchSongs()
}

export function postSong(data) {
  return fetchSongs({ method: 'POST', data })
}

export function deleteSong(id) {
  return fetchSongs({ method: 'DELETE', id })
}

export function patchSong(id, data) {
  return fetchSongs({ method: 'PATCH', id, data })
}

function fetchSongs({ method = 'GET', id = '', data } = {}) {
  return fetch('/songs/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

export function onSignUp(signUpEmail, signUpPassword) {
  return fetch('/users/', {
    method: 'POST',
    body: JSON.stringify({
      email: signUpEmail,
      password: signUpPassword
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
  // .then(json => {
  //   if (json.success) {
  //     console.log('json', json, json.message)
  //   } else {
  //     console.log('json', json, json.message)
  //   }
  // })
}

export function onLogin(loginEmail, loginPassword) {
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => {
      console.log('json', json)
      if (json.success) {
        setInStorage('user', { token: json.token })
      } else {
        console.log('json-Error', json, json.message)
      }
    })
}
