import {
  LOGOUT,
  LOGIN,
  RESTORE_USER,
  SIGNUP,
  DELETE_USER,
  SETUP_PROFILE,
  EDIT_NAME,
} from "../actions/UserActions";



export interface Action {
    type: string;
    payload: any;
}

const initialState = {
  localId: undefined,
  displayName: undefined,
  firstName: undefined,
  lastName: undefined,
  eduProgram: undefined,
  idToken: undefined,
  email: undefined,
  emailVerified: undefined,
  createdAt: undefined,
  lastLoginAt: undefined,
  isOnline: undefined,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        idToken: action.payload.idToken,
        email: action.payload.email,
        displayName: action.payload.string,
        localId: action.payload.string,
        refreshToken: action.payload.string,
      };
      
    case RESTORE_USER:
      return {
        ...state,
        idToken: action.payload.idToken,
        localId: action.payload.localId,
        email: action.payload.email,
        displayName: action.payload.displayName,
        refreshToken: action.payload.string,
      };

    case LOGOUT:
      return {
        ...state,
        idToken: undefined,
        email: undefined,
        displayName: undefined,
        createdAt: undefined,
        isOnline: undefined,
        localId: undefined,
        refreshToken: undefined,
      };

    case LOGIN:
      return {
        ...state,
        idToken: action.payload.idToken,
        localId: action.payload.string,
        email: action.payload.email,
        displayName: action.payload.string,
        createdAt: action.payload.string,
        refreshToken: action.payload.string,
      };

    case DELETE_USER:
      return { 
        ...state, 
        idToken: undefined 
      };

    case SETUP_PROFILE:
      return {
        ...state,
        idToken: action.payload.idToken,
        displayName: action.payload.string,
        eduProgram: action.payload.string,
        firstName: action.payload.string,
        lastName: action.payload.string,
      };

    case EDIT_NAME:
      return { 
        ...state, 
        idToken: undefined,
        localId: undefined,
        displayName: action.payload.string, };

    default:
      return state;
  }
};

export default userReducer;
