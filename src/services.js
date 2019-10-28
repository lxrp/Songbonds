import { setInStorage } from './Storage'

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

export function onSignUp(
  username,
  signUpEmail,
  signUpPassword,
  isBand,
  bandname
) {
  return fetch('/users/signup', {
    method: 'POST',
    body: JSON.stringify({
      name: username,
      email: signUpEmail,
      password: signUpPassword,
      band: isBand,
      bandname: bandname
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        console.log('json', json, json.message)
      } else {
        console.log('json', json, json.message)
      }
    })
    .catch(error => console.log(error))
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
    .catch(error => console.log(error))
}

export function getActiveUser(token) {
  return fetch('/getUser?token=' + token, {
    method: 'GET'
  })
    .then(res => res.json())
    .catch(error => console.log(error))
}

export function getSongsByAuthor(author) {
  return fetch('/getSongsByAuthor?author=' + author, {
    method: 'GET'
  })
    .then(res => res.json())
    .catch(error => console.log(error))
}
