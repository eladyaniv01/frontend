export function authHeader() {
  let user = JSON.parse(JSON.stringify(localStorage.getItem('user')))
  let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))
  if (user && token) {
    return { Authorization: 'Token ' + token }
  } else {
    return {}
  }
}
