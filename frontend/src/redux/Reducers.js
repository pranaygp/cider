export function profile(state = { 
  loggedIn: false,
  name: "",
  pictureURL: "",
  facebookId: "",
  _id: "",
  email: "",
  about:"",
  classes: []
 }, action){
  switch(action.type){
    case 'SET_LOGGED_IN_USER':
      return { ...state, ...action.profile, loggedIn: true }
    case 'LOGOUT':
      return { ...state, name: "", pictureURL:"", facebookId:"", _id:"", email:"", about:"", classes:[], loggedIn: false }
    default:
      return state
  }
}

export function classes(state = { }, action){
  switch(action.type){
    case 'SET_CLASS':
      return { ...state, [action.data._id]: { ...state[action.data._id] , ...action.data }  }
    default:
      return state
  }
}

export function api(state = {}, action){
  if(action.type === 'GOT'){
    return { ...state, [action.url]: { ...state[action.url], ...action.data } }
  }
  return state
}