export function profile(state = { 
  loggedIn: false,
  name: "",
  pictureURL: "",
  facebookId: "",
  _id: "",
  email: "",
  about:""
 }, action){
  switch(action.type){
    case "SET_LOGGED_IN_USER":
      return { ...state, ...action.profile, loggedIn: true }
    case 'LOGOUT':
      return { ...state, name: "", pictureURL:"", facebookId:"", _id:"", email:"", about:"", loggedIn: false }
    default:
      return state
  }
}