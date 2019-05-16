export function nutritionist(state) {
  return state.user.nutritionist
}
export function getUser(state) {
  console.log(state.user)
  console.log(state.user !== null)
  if (state.user !== null) {
    return state.user.username
  } else {
    return null
  }
}


