import Models from 'src/store/ORM/models.js'
import axios from 'axios'
export function REGISTERSTART(state) {
  state.registering = true
}
export function REGISTERSTOP(state, errorMessage) {
  state.registering = false
  state.regError = errorMessage
}
export function LOGINSTART(state) {
  state.loggingIn = true
}
export function LOGINSTOP(state, errorMessage) {
  state.loggingIn = false
  state.loginError = errorMessage
}
export function LOGOUT(state) {
  state.token = null
  state.user = null
  state.nutritionist = null
  state.loggedin = false

  localStorage.setItem('loggedin', false)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('nutritionist')

  localStorage.removeItem('email')
}
export function UPDATEUSER(state, payload) {

  if (!payload) {
    state.loggedin = false
    localStorage.setItem('loggedin', false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    localStorage.removeItem('email')
    localStorage.removeItem('nutritionist')
    state.user = null
    state.token = null

    state.email = null

  } else {

    state.user = payload.user
    localStorage.setItem('user', state.user.username)
    state.loggedin = true
    localStorage.setItem('loggedin', true)
  }
}
// export function UPDATENUTRITIONIST(state, payload) {
//   console.log('PAYLOAD UPDATE NUT', payload)
//   if (!payload) {
//     state.loggedin = false
//     localStorage.setItem('loggedin', false)
//     localStorage.removeItem('nutritionist')
//     state.nutritionist = null
//     return
//   } else {
//     if (payload.user.nutritionist) {
//       state.nutritionist = payload.user.nutritionist
//     } else {
//       state.nutritionist = payload.user
//     }
//     localStorage.setItem('nutritionist', state.nutritionist.username)
//     state.loggedin = true
//     localStorage.setItem('loggedin', true)
//   }
// }
export function FETCHTOKEN(state) {
  if (state.token) {
    localStorage.setItem('token', state.token)
  }
  if (state.user) {
    localStorage.setItem('user', state.user.username)
  }

  if (state.email) {
    localStorage.setItem('email', state.email)
  }
  if (state.nutritionist) {
    localStorage.setItem('nutritionist', state.nutritionist)
  }
}
export function SETTOKEN(state, accessToken) {
  if (!accessToken) {
    axios.defaults.headers.common['Authorization'] = null
  }
  else {
    axios.defaults.headers.common['Authorization'] = 'Token ' + accessToken
  }
  state.token = accessToken

  localStorage.setItem('token', accessToken)
  localStorage.setItem('user', state.user.username)

}
export function ADDCLIENT(state, payload) {

  if (!payload) {
    return
  } else {
    state.user.nutritionist.clients.push(payload)
    Models.Client.insert({ data: payload })
  }
}
export function ADDEVENT(state, payload) {

  if (!payload) {
    return
  } else {

    Models.Event.insert({ data: payload })
  }
}

export function FETCHCLIENTS(state, payload) {
  console.log('FETCHCLIENTS PAYLOAD ', payload)
  if (!payload) {
    return state.user.nutritionist.clients || null
  } else {
    state.user.nutritionist.clients = (payload)
  }
}
export function SETCURRENTCLIENT(state, payload) {
  state.currentClient = payload

}
export function SETCLIENTS(state, payload) {
  state.clients = payload

}
export function SETCLIENTNOTES(state, payload) {
  state.currentClient.private_notes = payload

}

export function ADDWEIGHTHEIGHTSET(state, payload) {

  if (!payload) {
    return
  } else {

    Models.WeightHeightSet.insert({ data: payload })
  }
}
export function SETCLIENTWEIGHTHEIGHTSETS(state, payload) {
  state.currentClient.weight_height_sets = payload

}
export function MOVETABLE(state, { from, to, tables }) {
  const tableToMove = tables[from]
  tables.push(tableToMove)


}
export function SETCLIENTTESTS(state, payload) {
  state.currentClient.tests = payload

}

