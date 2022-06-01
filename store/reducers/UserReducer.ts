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
        displayName: action.payload.displayName,
        localId: action.payload.localId,
        refreshToken: action.payload.refreshToken,
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
      
    case RESTORE_USER:
      return {
        ...state,
        idToken: action.payload.idToken,
        localId: action.payload.localId,
        email: action.payload.email,
        displayName: action.payload.displayName,
        createdAt: action.payload.createdAt,
        refreshToken: action.payload.refreshToken,
      };

    case LOGIN:
      return {
        ...state,
        idToken: action.payload.idToken,
        localId: action.payload.localId,
        email: action.payload.email,
        displayName: action.payload.displayName,
        createdAt: action.payload.createdAt,
        refreshToken: action.payload.refreshToken,
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
        displayName: action.payload.displayName,
        eduProgram: action.payload.eduProgram,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };

    case EDIT_NAME:
      return { 
        ...state, 
        idToken: undefined,
        localId: undefined,
        displayName: action.payload.displayName, };

    default:
      return state;
  }
};

export default userReducer;
