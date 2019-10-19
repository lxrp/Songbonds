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
