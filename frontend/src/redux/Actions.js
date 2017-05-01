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

export function addClass(data){
  return ({
    type: 'SET_CLASS',
    data
  })
}

export function get(url){
  console.log(url);
  return ({
    type: 'GET',
    url
  })
}