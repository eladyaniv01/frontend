// export function login({ commit }, form) {
//   const response = axios.post('http://127.0.0.1:8000/api/auth/login/', form)
//   commit('login', { token: response.data.token, user: response.data.user })
//   setAxiosHeaders(response.data.token)
// }

// export function setAxiosHeaders(token) {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
// }

export function UpdateUser({ state, commit }, payload) {
  if (!payload) {
    commit('UPDATEUSER', payload)
  }
  if (state.user != payload) {
    commit('UPDATEUSER', payload)
  }
}
export function UpdateNutritionist({ state, commit }, payload) {
  if (!payload) {
    commit('UPDATENUTRITIONIST', payload)
  }
  if (state.user != payload) {
    commit('UPDATENUTRITIONIST', payload)
  }
}
export function UpdateToken({ state, commit }, payload) {
  if (state.token != payload) {
    commit('SETTOKEN', payload)
  }
}
export function FetchToken({ state, commit }) {
  commit('FETCHTOKEN')
}
export function LogOut({ state, commit }) {
  commit('LOGOUT')
}
export function DoLogin({ state, commit }) {
  commit('LOGINSTART')
}
export function StopLogin({ state, commit }) {
  commit('LOGINSTOP')
}
export function DoRegister({ state, commit }) {
  commit('REGISTERSTART')
}
export function StopRegister({ state, commit }) {
  commit('REGISTERSTOP')
}
export function AddClient({ state, commit }, payload) {
  commit('ADDCLIENT', payload)
}
export function FetchClients({ state, commit }, payload) {
  commit('FETCHCLIENTS', payload)
}

export function SetCurrentClient({ state, commit }, payload) {
  commit('SETCURRENTCLIENT', payload)
}

export function SetClients({ state, commit }, payload) {
  commit('SETCLIENTS', payload)
}
export function SetClientNotes({ state, commit }, payload) {
  commit('SETCLIENTNOTES', payload)
}