export function setLoggedInProfile(profile) {
  return ({
    type: "SET_LOGGED_IN_USER",
    profile
  })
}

export function logout(){
  return ({
    type: 'LOGOUT'
  })
}